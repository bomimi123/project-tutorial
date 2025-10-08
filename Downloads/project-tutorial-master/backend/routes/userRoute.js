import express from "express";
import { loginUser, registerUser, listUsers, deleteUser, listUserOrders,updateUser, loginAdmin  } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/list", authMiddleware, listUsers);
userRouter.post("/delete", authMiddleware, deleteUser);
userRouter.get("/orders/:userId", authMiddleware, listUserOrders);
userRouter.post("/update/:userId", authMiddleware, updateUser)

userRouter.post("/admin/login", loginAdmin);

export default userRouter;
