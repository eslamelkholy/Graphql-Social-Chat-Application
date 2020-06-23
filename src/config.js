export const {
  APP_PORT = 8000,
  NODE_ENV = 'development',
  DB_USERNAME = 'chat',
  DB_PASSWORD = '123',
  DB_HOST = '',
  DB_PORT = '27017',
  DB_NAME = 'chat'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
