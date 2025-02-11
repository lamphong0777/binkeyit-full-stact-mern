const verifyEmailTemplate = (name, url) => {
    return `
        <p>Dear ${name}.</p>
        <p>Thank you for registering Binkeyit.</p>
        <a href="${url}" style="color: white, backgound: blue; margin-top: 10px; padding: 20px">
            Verify email
        </a>
    `
}

export default verifyEmailTemplate;