const authService = require("@/services/auth.service");
const usersService = require("@/services/users.service");

exports.showLoginForm = async (req, res) => {
  res.render("admin/auth/login", {
    layout: "admin/layout/auth",
  });
};

exports.login = async (req, res) => {
  const user = await authService.login(req.body);
  if (user) {
    await res.session.set("userId", user.id);
    const users = await usersService.getAll();
    res.redirect("/admin/users");
    return;
  }
  res.render("admin/auth/login", {
    layout: "admin/layout/auth",
  });
};

exports.showRegisterForm = async (req, res) => {
  res.render("admin/auth/register", {
    layout: "admin/layout/auth",
  });
};

exports.register = async (req, res) => {
  const { confirm_password, ...body } = req.body;
  await authService.register(body);
  res.render("admin/auth/login", {
    layout: "admin/layout/auth",
  });
};

exports.showForgotForm = async (req, res) => {
  res.render("admin/auth/forgotPassword", {
    layout: "admin/layout/auth",
  });
};

exports.showResetForm = async (req, res) => {
  res.render("admin/auth/resetPassword", {
    layout: "admin/layout/auth",
  });
};
