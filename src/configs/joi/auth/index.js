const Joi = require('@hapi/joi')

const validation = {
  user(data) {
    const schema = Joi.object().keys({
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required()
    })
    return Joi.validate(data, schema)
  },
  login(data) {
    const schema = Joi.object().keys({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required()
    })
    return Joi.validate(data, schema)
  }
}

module.exports = validation
