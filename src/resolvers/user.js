import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { signUp } from '../schemas'
export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO: Auth, Prejection, Pagination
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // TODO: Auth, Projection, Sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user id`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // TODO: not Authenticated
      await Joi.validate(args, signUp, { abortEarly: false })
      return User.create(args)
    }
  }
}
