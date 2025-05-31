const { validationResult } = require("express-validator");

const handlerError = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const formatted = errors
    .array({
      onlyFirstError: true,
    })
    .reduce((formattedErrors, error) => {
      formattedErrors[error.path] = error.msg;
      return formattedErrors;
    }, {});

  res.render(res.view, {
    errors: formatted,
    old: { id: req.params.id, ...req.body },
    title: req?.title,
  });
};

module.exports = handlerError;
