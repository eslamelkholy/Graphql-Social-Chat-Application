import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'

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
    signUp: (root, args, context, info) => {
      // TODO: not Authenticated, Validation
      return User.create(args)
    }
  }
}
