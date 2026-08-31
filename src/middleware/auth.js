// const jwt = require("jsonwebtoken");

// const checkAuthentication = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = checkAuthentication;
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // ইউজার মডেলটি অবশ্যই ইম্পোর্ট করবেন

const checkAuthentication = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // ১. টোকেন ভেরিফাই করা
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ২. ডাটাবেজ থেকে একদম লেটেস্ট ইউজার ডাটা নেওয়া (পাসওয়ার্ড ছাড়া)
    const freshUser = await User.findById(decoded.id).select("-password");

    if (!freshUser) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // ৩. req.user এর মধ্যে ডাটাবেজের তাজা ডাটা রেখে দেওয়া
    req.user = freshUser;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = checkAuthentication;
