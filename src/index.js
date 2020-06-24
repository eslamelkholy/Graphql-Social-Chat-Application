import express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  IN_PROD, APP_PORT,
  DB_NAME, DB_PORT,
  SESSION_NAME, SESSION_SECRET, SESSION_LIFETIME,
  REDIS_HOTS, REDIS_PASSWORD, REDIS_PORT
} from './config'

(async () => {
  try {
    await mongoose.connect(
      `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true }
    )
    const app = express()
    app.disable('x-powered-by')
    const RedisStore = connectRedis(session)
    const store = new RedisStore({
      host: REDIS_HOTS,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD
    })
    app.use(session({
      store,
      name: SESSION_NAME,
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure: IN_PROD
      }
    }))
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD
    })
    server.applyMiddleware({ app })
    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.log(e)
  }
})()
