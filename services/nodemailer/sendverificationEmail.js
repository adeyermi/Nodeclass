const transporter = require("./transporter")
const sendVerificationEmail = async (email, token, name) => {
    const mailOptions = {
        to: email,
        from: "Aliexpress",
        subject: `${name}, verify you email. 😊`,
        html: `
            <div style="display: flex; flex-direction: column; gap: .5rem; width: 80%; margin: auto; text-align: center;">
                <h1>Hello, ${name}</h1>
                <p> Thanks for signing up! Please verify your email address by clicking the button below:</p>
                <a href="http://localhost:5173/verify/${token}" style="background-color: red; color: white; padding: .5rem 1rem; border-radius: 5px; width: fit-content; margin: auto;">Verify email</a>
            </div>
        `
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendVerificationEmail