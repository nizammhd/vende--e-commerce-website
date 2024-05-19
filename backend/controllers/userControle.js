const Userdb = require("../models/usermodel");

const productDatas = require("../models/productModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
require('dotenv').config();

exports.userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Userdb.findOne({ email });

    if (userExists) {
      return res.status(400).send("email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new Userdb({ email, password: hashPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch {
    console.log(error);
    res.status(500).send("registration failed");
  }
};

exports.getUser = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(400).send({ message: "not found with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error retriving user with id " + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "error occured while retriving user information",
        });
      });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const user = await Userdb.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        console.log(process.env.JWT_SECRET);
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60,
      });
      
      console.log(token)
      res.status(200).send({ message: "welcome user", token, userID:user._id});
     
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Login failed");
  }
};

exports.userDelete= async (req,res)=>{
  try {
    const id = req.params.id
  await Userdb.findByIdAndDelete(id)

  Userdb.save()
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:error.message
    });
  }
  
  

}
exports.userLogout = (req, res) => {
  try {
    
    res.clearCookie('token');

   
    res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Logout failed");
  }
};
exports.getUsers=async (req,res)=>{
  try {
    const users= await Userdb.find()
    res.send(users)
    
  } catch (error) {
    console.log(error.message)
    res.send(error.message)
    
  }

}
exports.userDelete=()=>{
  
  let id = req.params.id
  const user= Userdb.findByIdAndDelete(id)
}