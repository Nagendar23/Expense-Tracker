const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
exports.registerUser = async(req,res) => {
    const  {fullName, email, password, profileImageUrl} = req.body;

    //validation => check for missing fields
    if(!fullName || !email || !password){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    try{
        //check if email already exists
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({msg: " User with this email already exists"});
        }

        //Create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });
        console.log(user);
        res.status(201).json({
            id: user._id,
            user,
            token:generateToken(user._id)
        });
    }catch(err){
        console.log("Something error in login",err)
        res.status(500).json({msg: "Error registering user",error:err.message});
    }
}

//Login User
exports.loginUser = async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    try{
        const user = await User.findOne({ email });
        if(!user){
            console.log("The user doesn't exists")

            return res.status(400).json({message:"The user doesn't exists"})
        }
        if(!(await user.comparePassword(password))){
            console.log("The password doesn't match");
            return res.status(400).json({message:"Password doesn't match"})
        }
        console.log(user._id,user)
        res.status(200).json({id:user._id,
            user,
            token:generateToken(user._id)
        })
    }catch(err){
        console.log("User not logged in",err)
        return res.status(500).json({message:"Internal server error",error:err.message})
    }
}

//getUserInfo
exports.getUserInfo = async(req,res) => {
    try{
        // Since req.user already contains the user object from middleware
        // We can either return it directly or re-fetch it using _id
        if(!req.user){
            console.log("User not found");
            return res.status(400).json({message:"User not found"})
        }
        console.log("User fetched successfully", req.user);
        return res.status(200).json(req.user);
    }catch(err){
        console.log("Internal Server Error, Try again later");
        return res.status(500).json({message:"Internal Server Error",error:err.message})
    }
}