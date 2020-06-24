import Joi from 'joi'

const email = Joi.string().email().required().label('Email')
const username = Joi.string().alphanum().min(4).max(30).required().label('Username')
const name = Joi.string().max(254).required().label('Name')
const passwordRegexErrorMessage = 'Password must be between 8-30 Character at least and one Uppercase, one Lowercase, one digit and one Special Characters'
const password = Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/).required().label('Password').options({
  language: {
    string: {
      regex: {
        base: passwordRegexErrorMessage
      }
    }
  }
})

export default Joi.object().keys({
  email,
  username,
  name,
  password
})

export const signUp = Joi.object().keys({
  email,
  username,
  name,
  password
})

export const signIn = Joi.object().keys({
  email,
  password
})
