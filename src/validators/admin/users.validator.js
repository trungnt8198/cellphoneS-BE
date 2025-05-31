const { checkSchema } = require("express-validator");
const handlerError = require("../handlerErrors");
const usersService = require("@/services/users.service");

exports.createUserValidator = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  checkSchema({
    username: {
      notEmpty: {
        errorMessage: "Trường này không được để trống",
      },
      custom: {
        options: async (username) => {
          const existing = await usersService.isExistUsername(username);
          if (existing) return Promise.reject("Username đã tồn tại");
          return true;
        },
      },
    },
    email: {
      isEmail: {
        errorMessage: "Phải đúng định dạng email",
      },
      notEmpty: {
        errorMessage: "Trường này không được để trống",
      },
      custom: {
        options: async (email) => {
          const existing = await usersService.isExistEmail(email);
          if (existing) return Promise.reject("Email đã tồn tại");
          return true;
        },
      },
    },
    phone: {
      notEmpty: {
        errorMessage: "Trường này không được để trống",
      },
      custom: {
        options: async (phone) => {
          const existing = await usersService.isExistPhone(phone);
          if (existing) return Promise.reject("Phone đã tồn tại");
          return true;
        },
      },
    },
  }),
  handlerError,
];

exports.updateUserValidator = [
  (req, res, next) => {
    res.view = `admin/users/edit`;
    next();
  },
  checkSchema({
    username: {
      notEmpty: {
        errorMessage: "Trường này không được để trống",
      },
      custom: {
        options: async (username, { req }) => {
          const existing = await usersService.isExistUsernameExceptId(
            username,
            req.params.id
          );
          if (existing) return Promise.reject("Username đã tồn tại");
          return true;
        },
      },
    },
    email: {
      isEmail: {
        errorMessage: "Phải đúng định dạng email",
      },
      notEmpty: {
        errorMessage: "Trường này không được để trống",
      },
      custom: {
        options: async (email, { req }) => {
          const existing = await usersService.isExistEmailExceptId(
            email,
            req.params.id
          );
          if (existing) return Promise.reject("Email đã tồn tại");
          return true;
        },
      },
    },
    phone: {
      notEmpty: {
        errorMessage: "Trường này không được để trống",
      },
      custom: {
        options: async (phone, { req }) => {
          const existing = await usersService.isExistPhoneExceptId(
            phone,
            req.params.id
          );
          if (existing) return Promise.reject("Phone đã tồn tại");
          return true;
        },
      },
    },
  }),
  handlerError,
];
