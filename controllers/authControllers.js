import User from "../models/User.Models.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    if (![phone]) {
      return res.status(400).send({ error: "Phone is required" });
    }
    if (!address) {
      return res.status(400).send({ error: "Address is required" });
    }

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res
        .status(200)
        .send({ success: true, message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (e) {
    console.log(e);
    res.status(404).send({
      success: false,
      message: "Error In Register",
      error: e,
    });
    process.exit(1);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User does not exist" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: "Incorrect Password" });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "User Logged In Successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        _id: user._id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error In Login",
      error: e,
    });
    process.exit(1);
  }
};

export const testController = async (req, res, next) => {
  try {
    res.status(200).send({
      success: true,
      message: "User Logged In Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error In Login",
      error: e
    });
    process.exit(1);
  }
};
