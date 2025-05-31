const express = require("express");
const usersController = require("@/controllers/admin/users.controller");
const {
  createUserValidator,
  updateUserValidator,
} = require("@/validators/admin/users.validator");
const attachResourceLoader = require("../../../utils/attachResourceLoader");

const router = express.Router();
attachResourceLoader(router, ["user"]);

router.get("/", usersController.index);
router.post("/", createUserValidator, usersController.store);
router.get("/create", usersController.create);
router.get("/:id/edit", usersController.edit);
router.get("/:id", usersController.show);
router.put("/:id", updateUserValidator, usersController.update);
router.delete("/:id", usersController.delete);

module.exports = router;
