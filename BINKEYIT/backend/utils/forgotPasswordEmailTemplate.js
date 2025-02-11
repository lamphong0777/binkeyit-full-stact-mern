const forgotPasswordEmailTemplate = ({ name, otp }) => {
    return `
        <div>
            <p>Dear: ${name}</p>
            <p>You're requested a password reset. Please use following OTP code to reset your password.</p>
            <div style="background:yellow;font-size:20px">
                ${otp}
            </div>
            <p>This OTP is valid for 1hour only. Enter this OTP in the Binkeyit website to proceed with reseting your password.</p>
            <br>
            <p>Thanks.</p>
            <p>Binkeyit.</p>
        </div>    
    `
}

export default forgotPasswordEmailTemplate;