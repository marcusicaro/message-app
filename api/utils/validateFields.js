const Joi = require('joi');

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(4).max(30).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(user);
};

module.exports = {
  validateUser,
};
