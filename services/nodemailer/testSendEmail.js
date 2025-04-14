const transporter = require("./transporter")
const sendTestEmail = async ()=>{
    await transporter.sendMail({
        from: `Aliexpress`,
        to: "oladipupoadaade@gmail.com",
        subject: "Verify your account",
        text: "Hello Emmanuel, We are glad to welcome you to our platform. Take your time to explore all our various services. 😊"
    })

    console.log('Email sent!');
    
}


module.exports = sendTestEmail