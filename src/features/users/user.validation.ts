import Joi from '@hapi/joi';

export const userSchema = Joi.object({
  login: Joi.string().required().email(),
  password: Joi.string().required().alphanum().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  age: Joi.number().required().min(4).max(130),
});
