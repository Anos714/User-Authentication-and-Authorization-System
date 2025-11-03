import joi from "joi";

export const registerValidate = (req, res, next) => {
  try {
    const schema = joi.object({
      username: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request, Please Try Again",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const loginValidate = (req, res, next) => {
  try {
    const schema = joi.object({
      identifier: joi
        .alternatives()
        .try(
          joi.string().email({ tlds: { allow: false } }),
          joi.string().alphanum().min(3).max(30)
        )
        .required()
        .messages({
          "alternatives.match": "Please enter a valid username or email",
          "string.empty": "Username or email is required",
        }),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request, Please Try Again",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};
