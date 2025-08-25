const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerusercontroller(req, res) {
  const {
    email,
    fullname: { firstname, lastname },
    password,
  } = req.body;

  // console.log(email,firstname,lastname,password)

  const isuserexist = await usermodel.findOne({
    email,
  });

  if (isuserexist) {
    return res.status(201).json({
      message: "user already exists",
    });
  }
  const hashedpassword = await bcrypt.hash(password, 10);

  const user = await usermodel.create({
    email: email,
    fullname: {
      firstname,
      lastname,
    },
    password: hashedpassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
    user: {
      email: user.email,
      _id: user._id,
      fullname: user.fullname,
    },
  });
}

async function loginusercontroller(req, res) {
  const { email, password } = req.body;

  const user = await usermodel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const ispasswordvalid = await bcrypt.compare(password, user.password);

  if (!ispasswordvalid) {
    return res.status(400).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({
    message: "login successfully",
    user: {
      email: user.email,
      _id: user._id,
      fullname: user.fullname,
    },
  });
}

module.exports = { registerusercontroller, loginusercontroller };
