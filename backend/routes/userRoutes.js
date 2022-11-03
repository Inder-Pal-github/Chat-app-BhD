const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const router = require("express").Router();
require("dotenv").config();

// creating user
router.post("/new", upload.single('avatar'), async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.file);
    const user = await User.findOne({ email });
    if (user)
      return res.status(200).send({ msg: "User already exits! Please login" });
    // cloudinary upload
    const result = await cloudinary.uploader.upload(req.files?.path);
    if (!result) return res.status(400).send({ msg: "Upload failed" });
    let hashPassword = await bcrypt.hash(password, 8);
    const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const new_user = new User({ ...req.body, password: hashPassword });
    await new_user.save();
    res.status(201).send({
      msg: "User created successfully",
      email,
      token,
    });
  } catch (e) {
    console.log("Error",e);
    let msg;
    if (e.code === 11000) {
      msg = "User already exits";
    } else {
      msg = e.message;
    }
    return res.status(400).json(msg);
  }
});

// login user

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found, Please signup" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ msg: "Login success", email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = { router };
