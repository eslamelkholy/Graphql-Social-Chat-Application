import Joi from 'joi'

const passwordRegexErrorMessage = 'Password must be 8 Character at least and one Uppercase, one Lowercase, one digit and one Special Characters'
export default Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  username: Joi.string().alphanum().min(4).max(30).required().label('Username'),
  name: Joi.string().max(254).required().label('Name'),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/).required().label('Password').options({
    language: {
      string: {
        regex: {
          base: passwordRegexErrorMessage
        }
      }
    }
  })
})
