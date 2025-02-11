import AddressModel from '../models/address.model.js';
import UserModel from '../models/user.model.js';

export const addAddressController = async (req, res) => {
    try {
        const userId = req.userId; // auth middleware
        const {
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
        } = req.body;

        if (!address_line || !city || !state || !country || !pincode || !mobile) {
            return res.status(400).json({
                message: "Provide required fields.",
                error: true,
                success: false
            });
        }
        // Save to address
        const newUserAddress = new AddressModel({
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
            userId: userId
        });

        const saveUserAddress = await newUserAddress.save();

        // Update user model
        const updateUserAddress = await UserModel.updateOne({ _id: userId }, {
            $push: {
                address_details: saveUserAddress._id
            }
        });

        return res.json({
            message: "Address saved successfully.",
            data: saveUserAddress,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const getAddressController = async (req, res) => {
    try {
        const userId = req.userId;

        const userAddressData = await AddressModel.find({
            userId: userId
        }).sort({ createdAt: -1 });

        return res.json({
            message: "Get all user address",
            data: userAddressData,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const updateAddressController = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            _id,
            address_line,
            city,
            state,
            country,
            pincode,
            mobile
        } = req.body

        if(!_id || !address_line || !city || !state || !country || !pincode || !mobile) {
            return res.status(400).json({
                message: "Provide required fields.",
                error: true,
                success: false
            });
        }

        const updateAddress = await AddressModel.updateOne({ _id: _id, userId: userId}, {
            address_line,
            city,
            state,
            country,
            mobile,
            pincode
        });

        return res.json({
            message: "Update address successfully.",
            data: updateAddress,
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const deleteAddresscontroller = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id } = req.body;

        if(!_id) {
            return res.status(400).json({
                message: "Provide id",
                error: true,
                success: false
            });
        }

        const disableAddress = await AddressModel.updateOne({_id: _id, userId: userId}, {
            status: false
        });

        return res.json({
            message : "Address remove",
            data : disableAddress,
            error : false,
            success : true,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
