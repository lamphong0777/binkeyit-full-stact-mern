const generatedOtp = () => {
    return Math.floor(Math.random() * 900000) + 100000; // 100.000 - 900.000
}

export default generatedOtp;