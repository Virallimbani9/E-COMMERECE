import express from "express";
import {
  registerController,
  loginController,
  testController
} from "../controllers/authControllers.js";
import { isAuth,isAdmin } from "../middlewares/authMiddlewares.js";


const router = express.Router();


router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test",isAuth,testController);

export default router;
