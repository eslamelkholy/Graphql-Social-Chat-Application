User -hasMany-> Chat -hasMany-> Message

User
- _id: ObjectId
- name: String
- email: String
- username: String
- password: String
- chats: [ObjectId] -> Chat 
- createdAt: Date
- updatedAt: Date

Chat
- _id: ObjectId
- title: String
- users: [ObjectId] -> User
- lastMessage: ObjectId -> Message
- updatedAt: Date
- createdAt: Date

Message
- _id: ObjectId
- body: String
- sender: ObjectId -> User
- chat: ObjectId -> Chat
- createdAt: Date
- updatedAt: Date
