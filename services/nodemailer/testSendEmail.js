const transporter = require("./transporter")
const sendTestEmail = async ()=>{
    const mailOptions = {
        from: `Aliexpress`,
        to: "oladipupoadaade@gmail.com",
        subject: "Verify your account",
        text: "Hello Emmanuel, We are glad to welcome you to our platform. Take your time to explore all our various services. 😊"
    }
    await transporter.sendMail(mailOptions)
}


module.exports = sendTestEmail