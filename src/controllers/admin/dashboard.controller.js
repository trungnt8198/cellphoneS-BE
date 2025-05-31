const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const users = await usersService.getAll();
  res.render("admin/dashboard/index", {
    title: "User list",
    users,
  });
};
