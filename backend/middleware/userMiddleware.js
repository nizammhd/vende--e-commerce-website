//user middleware

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
require("dotenv").config();

const userMiddleware = (req, res, next) => {
  
  if(req.query.token){
  
  var token = req.query.token
  }else{

  var token = req.cookies.token 
  }
  
  

  console.log("Token in userMiddleware:", token);

  if (!token) {
   
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  
  }

  try {
    // console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true
    });
    // console.log("Decoded Token :", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    // console.log("Error in userMiddleware:", err);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = userMiddleware;
