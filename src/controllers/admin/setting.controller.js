exports.index = async (req, res) => {
  res.render("admin/settings/index", {
    title: "Settings",
  });
};
