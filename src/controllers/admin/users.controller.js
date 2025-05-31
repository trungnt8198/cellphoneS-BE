const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const users = await usersService.getAll();
  res.render("admin/users/", {
    title: "users List",
    users,
  });
};

exports.show = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  console.log(user);
  res.render("admin/users/show", {
    user,
  });
};

exports.create = async (req, res) => {
  res.render("admin/users/create", {
    title: "Create user",
    old: {},
    errors: {},
  });
};

exports.store = async (req, res) => {
  const { confirm_password, ...body } = req.body;
  const user = await usersService.create(body);
  res.redirect(`/admin/users`);
};

exports.edit = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.render("admin/users/edit", {
    title: "Edit user",
    old: user,
    errors: {},
  });
};

exports.update = async (req, res) => {
  const { confirm_password, ...body } = req.body;
  const user = await usersService.update(req.params.id, body);
  res.redirect(`/admin/users/${user.id}/edit`);
};

exports.delete = async (req, res) => {
  await usersService.remove(req.params.id);
  res.redirect(`/admin/users`);
};
