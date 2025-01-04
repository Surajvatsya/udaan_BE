const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      {
        name,
        email,
        role,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "72h",
      },
    );


    res.status(201).json({
      message: "Key Manager registered successfully",
      user,
      token
    });
  } catch (error) {
    console.error("Error while registering KM:", error);
    res.status(500).json({
      error: error,
    });
  }
};


const signIn = async (req, res, next) => {
  try {

    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }


    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Password matching failed" });
    }


    const token = jwt.sign(
      {
        userName: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "72h" }
    );


    res.status(200).json({
      userName: user.userName,
      role: user.role,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.error("Error during user sign-in:", err);
    res.status(500).json({ error: "An error occurred during sign-in" });
  }
};


module.exports = {
  signUp,
  signIn,
};
