import express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import redis from 'redis'
import connectRedis from 'connect-redis'
import mongoose from 'mongoose'
// TypeDefs & Resolvers and SchemaDirectives
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
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
    const client = redis.createClient(REDIS_PORT, REDIS_HOTS)
    client.auth(REDIS_PASSWORD)
    const store = new RedisStore({
      client
    })
    app.use(session({
      store,
      name: SESSION_NAME,
      secret: SESSION_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESSION_LIFETIME),
        sameSite: true,
        secure: IN_PROD
      }
    }))
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })
    server.applyMiddleware({ app, cors: false })
    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.log(e)
  }
})()
