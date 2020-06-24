import { AuthenticationError } from 'apollo-server-express'
import { User } from '../models'
import { SESSION_NAME } from '../config'

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

export const signOut = (req, res) => new Promise((resolve, reject) => {
  req.session.destroy(err => {
    if (err) reject(err)
    res.clearCookie(SESSION_NAME)
    resolve(true)
  })
})
