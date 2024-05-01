import JWT from "jsonwebtoken";
import User from "../models/User.Models.js";

//--------------------------User-------------------
export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Not Authorized" });
    process.exit(1);
  }
};

//-------------------------Admin--------------------
export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(decoded._id);
    if (user.role === 1) {
      next();
    } else {
      res.status(401).send({ success: false, message: "Not Authorized" });
      process.exit(1);
    }
  } catch (error) {
    res.status(401).send({ success: false, message: "Not Authorized" });
    process.exit(1);
  }
};
