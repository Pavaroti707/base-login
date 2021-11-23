import express from "express";
import userController from "../controllers/user.controller";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/users").get(userController.list);

router.route("/api/users/register").post(userController.create);

router
  .route("/api/users/:userId")
  .get(authController.requireSignin, userController.read);

router.param("userId", userController.userByID);

export default router;
