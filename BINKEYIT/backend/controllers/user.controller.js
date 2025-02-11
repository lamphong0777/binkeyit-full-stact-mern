import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloundinary.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordEmailTemplate from "../utils/forgotPasswordEmailTemplate.js";
import jwt from 'jsonwebtoken';

// Reegister controller
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email, name, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Email already registered.",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from Binkeyit",
      html: verifyEmailTemplate(name, verifyUrl),
    });

    return res.json({
      message: "User registerd successfully.",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Verify email controller
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return res.status(400).json({
        message: "Invalid code.",
        error: true,
        success: false,
      });
    }

    // Update verify_email
    const updateUser = UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.json({
      message: "Verify email done",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}
// Login controller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email, password is not empty.",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not register.",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Your account was locked.",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }
    // Access token
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);
    await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date()
    });

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Logout controller
export async function logoutController(req, res) {
  try {
    const userId = req.userId;
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    //Remove refresh token user
    await UserModel.findByIdAndUpdate(userId, {
      refresh_token: ""
    });

    return res.json({
      message: "Logout successfully.",
      error: false,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Upload user image controller (Avatar)
export async function uploadAvatarController(req, res) {
  try {
    const userId = req.userId; // auth middleware
    const image = req.file; // multer middleware
    const upload = await uploadImageCloudinary(image);

    await UserModel.findByIdAndUpdate({ _id: userId }, {
      avatar: upload.url
    })

    return res.json({
      message: "Upload successfully.",
      error: false,
      success: true,
      data: upload
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}
// Update user detail
export async function updateUserDetailController(req, res) {
  try {
    const userId = req.userId; // from auth middleware

    const { name, email, mobile, password } = req.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne({ _id: userId }, {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(mobile && { mobile: mobile }),
      ...(password && { password: hashPassword })
    });

    return res.json({
      message: "Update user detail successfully.",
      error: false,
      success: true,
      data: updateUser
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Forgot password controller (not auth middleware)
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Provide email.",
        error: true,
        success: false
      });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not available.",
        error: true,
        success: false
      });
    }

    // Generate OTP
    const otp = generatedOtp();
    const expireTime = new Date() + 60 * 60 * 1000 // 1h
    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString()
    })
    // Send email
    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Binkeyit.",
      html: forgotPasswordEmailTemplate({ name: user.name, otp: otp })
    });

    return res.json({
      message: "Check your email.",
      error: false,
      success: true,
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Verify forgot password OTP
export async function verifyForgotPasswordOtpController(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide email, otp",
        error: true,
        success: false
      });
    }
    const user = await UserModel.findOne({ email: email });
    // Check otp expired
    const currentDate = new Date().toISOString();
    if (user.forgot_password_expiry < currentDate) {
      return res.status(400).json({
        message: "OTP is expired.",
        error: true,
        success: false
      });
    }
    // Check invalid OTP
    if (otp != user.forgot_password_otp) {
      return res.status(400).json({
        message: "OTP is invalid.",
        error: true,
        success: false,
        otp: otp
      });
    }
    // detele otp
    await UserModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: ""
    });

    return res.json({
      message: "Verify password successfully.",
      error: false,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Reset password after verify OTP
export async function resetPasswordController(req, res) {
  try {
    const { email, new_password, confirm_password } = req.body;
    if (!email || !new_password || !confirm_password) {
      return res.status(400).json({
        message: "Provide required fields email, new_password, confirm_password.",
        error: true,
        success: false
      });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
        error: true,
        success: false
      });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({
        message: "New password and confirm password not match.",
        error: true,
        success: false
      });
    }
    // Reset user password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(new_password, salt);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword
    });

    return res.status(200).json({
      message: "Your password updated successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// refresh token
export async function refreshTokenController(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res.status(400).json({
        message: "Invalid token.",
        error: true,
        success: false
      });
    }
    // Verify token
    const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
    if (!verifyToken) {
      return res.status(400).json({
        message: "Token is exprired.",
        error: true,
        success: false
      });
    }

    const userId = verifyToken?.id;

    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);
    return res.status(400).json({
      message: "New token generated.",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Get all user for test
export async function getAllUserController(req, res) {
  try {
    const users = await UserModel.find({});

    if (!users) {
      return res.json({
        message: "Users empty.",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Get user successfully.",
      error: false,
      success: true,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function userDetailsController(req, res) {
  try {
    const userId = req.userId; // middleware auth

    const user = await UserModel.findById(userId).select('-password -refresh_token');

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
        error: true
      })
    }

    return res.json({
      message: "Get user detail successfully.",
      data: user,
      success: true,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}