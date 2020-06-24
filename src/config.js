export const {
  APP_PORT = 8000,
  NODE_ENV = 'development',

  DB_USERNAME = 'chat',
  DB_PASSWORD = '123',
  DB_HOST = '',
  DB_PORT = '27017',
  DB_NAME = 'chat',

  SESSION_NAME = 'sid',
  SESSION_SECRET = 'eslams_sh_secrect',
  SESSION_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOTS = 'redis-17503.c8.us-east-1-4.ec2.cloud.redislabs.com:17503',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'secret'

} = process.env

export const IN_PROD = NODE_ENV === 'production'
