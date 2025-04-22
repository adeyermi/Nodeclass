const express = require("express");
const app = express();
const cors = require("cors")
const  connectDB = require('./config/connectToDB')
connectDB()



const userRouter = require("./Routes/users")
const productRouter = require("./Routes/productrou")
const errorHandler = require("./middlewares/errorHander")
// const transporter = require("./services/nodemailer/transporter")

// const sendTestEmail = require("./services/nodemailer/testSendEmail")
// sendTestEmail()

app.use(express.json());
app.use(cors())
const port = 4300;

app.listen(port, () => {
  console.log("Listening to the host");
});



app.use("/api/product", productRouter)
app.use("/api/users", userRouter)

app.all("/{*any}", (req, res)=>{
  res.status(404).json(`${req.method} ${req.originalUrl} is not an endpoint on this server.`)
})

app.use("/{*any}", errorHandler)




// app.use("/user/product", userRouter)\/\

// usert => role: string: ("user" | "admin")

// error handling
// cloudinary
// deployment