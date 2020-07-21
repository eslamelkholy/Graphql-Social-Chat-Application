import mongoose from 'mongoose'
import Joi from 'joi'

const ObjectId = {
  base: Joi.string(),
  name: 'string',
  language: {
    ObjectId: 'Must Be A Valid Object Id'
  },
  rules: [{
    name: 'ObjectId',
    validate (params, value, state, options) {
      if (!mongoose.Types.ObjectId.isValid(value)) return this.createError('string.ObjectId', {}, state, options)
      return value
    }
  }]
}

export default Joi.extend(ObjectId)
