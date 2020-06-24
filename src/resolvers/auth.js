import { AuthenticationError } from 'apollo-server-express'
import { User } from '../models'

const signedIn = req => req.session.userId

export const checkSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be Signed in ')
  }
}

export const checkedSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You Already Signed in. ')
  }
}

export const attempSignIn = async (email, password) => {
  const loginErrorMesssage = 'Incorrect Email Or Password please Try Again'
  const user = await User.findOne({ email })
  if (!user || !await user.matchesPassword(password)) {
    throw new AuthenticationError(loginErrorMesssage)
  }
  return user
}
