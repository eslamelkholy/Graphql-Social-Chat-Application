// const express = require("express");
// const graphqlHTTP = require("express-graphql");
// const { buildSchema } = require("graphql");
// const crypto = require("crypto");

// const db = {
//     users: [
//         {id:'1', email:"eslam@gmail.com", name:"eslam", avatarUrl:"1.jphs"},
//         {id:'2', email:"eslam@gmail.com", name:"eslam", avatarUrl:"1.jphs"},
//         {id:'3', email:"eslam@gmail.com", name:"eslam", avatarUrl:"1.jphs"},
//         {id:'4', email:"eslam@gmail.com", name:"eslam", avatarUrl:"1.jphs"},
//     ],
//     messages: [
//         {id: '1', userId: '1', body: "Hello World1", createdAt: Date.now()},
//         {id: '2', userId: '2', body: "Hello World2", createdAt: Date.now()},
//         {id: '3', userId: '3', body: "Hello World3", createdAt: Date.now()},
//     ]
// }

// const schema = buildSchema(`
//     type Query {
//         users: [User!]
//         user(id: ID!): User
//         messages: [Message!]!
//     }
//     type User {
//         id: ID!
//         email: String!
//         name: String
//         avatarUrl: String
//         messages: [Message!]!
//     }
//     type Message {
//         id: ID!
//         body: String!
//         userId: User!
//         createdAt: String
//     }
//     type Mutation {
//         addUser(email: String!, name:String): User
//         addMessage(body: String!, userId: ID!): Message
//     }

// `);

// class User{
//     constructor(user){
//         Object.assign(this, user)
//     }
//     get messages(){
//         return db.messages.filter(message => message.userId === this.id);
//     }
// }

// const rootValue = {
//     users: () => db.users.map(user => new User(user)),
//     user: args => db.users.find(user => user.id === args.id),

//     messages: () => db.messages,

//     addUser: ({email, name}) => {
//         const user = {
//             id: crypto.randomBytes(10).toString('hex'),
//             email,
//             name
//         }
//         db.users.push(user);
//         return user;
//     }
// }

// const app = express();

// app.use("/graphql", graphqlHTTP({
//     schema,
//     rootValue,
//     graphiql:true
// }))

// app.listen(8000, () => console.log("Listening on 8000..."));
