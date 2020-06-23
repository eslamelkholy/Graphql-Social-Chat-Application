import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { IN_PROD, APP_PORT, DB_NAME, DB_PORT } from './config'

(async () => {
  try {
    await mongoose.connect(
      `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true }
    )
    const app = express()
    app.disable('x-powered-by')
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
