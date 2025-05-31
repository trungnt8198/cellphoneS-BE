const express = require("express");
const authController = require("@/controllers/admin/auth.controller");
const router = express.Router();

router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);
router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);
router.get("/forgotPassword", authController.showForgotForm);
router.get("/resetPassword", authController.showResetForm);

module.exports = router;
