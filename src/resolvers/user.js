import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { signUp, signIn } from '../schemas'
import { attempSignIn, signOut } from './auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      // TODO: Prejection, Pagination
      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      // TODO:Projection, Sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user id`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      await Joi.validate(args, signUp, { abortEarly: false })
      const user = await User.create(args)
      req.session.userId = user.id
      return user
    },

    signIn: async (root, args, { req }, info) => {
      await Joi.validate(args, signIn, { abortEarly: false })
      const { email, password } = args

      const user = attempSignIn(email, password)
      req.session.userId = user.id
      return user
    },

    signOut: (root, args, { req, res }, info) => {
      return signOut(req, res)
    }

  }
}
