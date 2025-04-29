const userModel = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Blacklisted = require("../model/tokenMod")
const generateRandomString = require("../utils/genRandomString")
const sendVerificationEmail = require("../services/nodemailer/sendverificationEmail")

//     http://localhost:5173/verify/:token

async function signup(req, res, next) {

try {
    const {password} = req.body
    const Salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, Salt)
    // generate verification token
    const verificationToken = generateRandomString(10)
    // generate verification exp
    const verificationExp = Date.now() + 60000 // 1 minute

    const user = await userModel.create({...req.body, password: hashed, verificationToken, verificationExp})

    if (!user) {
        res.status(400).json({
            status: "error",
            message: "user not created",
            user
        })
        
    } else {
           // send verification email
           sendVerificationEmail(user.email, verificationToken, user.name)
           
           res.status(201).json({
               status: "Success",
               message: "user created successfully",
               user
           })
           
       }
    
} catch (error) {
    // console.log(error);
    next(error)
}


    
}



const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Verification token is missing",
      });
    }

    
    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Invalid or expired verification token",
      });
    }

    
    if (Date.now() > parseInt(user.verificationExp)) {
      return res.status(400).json({
        status: "error",
        message: "Verification token has expired",
      });
    }

    await userModel.findByIdAndUpdate(user._id, {verificationExp: null, verificationToken: null, isVerified: true})

    return res.status(200).json({
      status: "success",
      message: "Email verified successfully!",
    });

  } catch (error) {
    console.error( error);
    return res.status(500).json({
      status: "error",
      message: "Server error while verifying email",
    });
  }
};




async function signIn(req, res, next) {
    try {
  const {email, password} = req.body

  const user = await userModel.findOne({id})
  if(!user){
    res.status(404).json({
        status: "error",
        message: "Email or password incorrect",
        user
    })
    return
  }

  const passwordCorrect = await  bcrypt.compare(password, user.password)
  if(!passwordCorrect){
    res.status(404).json({
        status: "error",
        message: "Email or password incorrect"
    })
    return
  }

//   twt
console.log("JWT_SECRET is:", process.env.JWT_SECRET);
const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" });
res.status(200).json({
    status: "success",
    message: "User sucessfully signin",
    token,
    user
    })

        
    
}
    catch (error) {
        console.log(error);
    }
    
}


const logOut = async (req, res) => {
    try {

    const {token} = req.body
    await Blacklisted.create({token})
    res.status(200).json({
        status: "success",
        message: "logOut Successfully"
    })

    } catch (error) {
        console.log(error);
        
    }
    
}

// truttle
// rate-limiting
// ip address

const getAllUsers = async (req, res) => {
    const Add = await userModel.find(req.body)
    if (!Add) {
           res.status(400).json({
            status: "error",
            message: "All user not listed",
            Add
         })
         return
    }
    res.status(200).json({
        status: "Success",
        message: "All user listed",
        Add
    })
}


const getUserById = async (req, res) => {
    const Add = await userModel.findByEmail("Ade@gmail.com")
    if (!Add) {
           res.status(400).json({
            status: "error",
            message: "Single user not listed",
            Add
         })
         return
    }
    res.status(200).json({
        status: "Success",
        message: "Single user listed ",
        Add
    })
}


const updateUser = async (req, res) => {
    try {
        const {id} = req.params
      
        const updates =  await userModel.findByIdAndUpdate(id, req.body); 

        // const updatedUser = await userModel.findByIdAndUpdate(fixedId, updates, { new: true, runValidators: true });

        if (!updates) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Server error",
        });
    }
};

    



const getUserByIdAndDelete = async (req, res) => {
    const {id} = req.params
   await userModel.findByIdAndDelete(id)
    res.status(200).json({
        status: "Success",
        message: "single user deleted successfully",
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    signup,
    getUserByIdAndDelete,
    updateUser,
    signIn,
    logOut,
    verifyEmail
}