import Joi from './joi'

export const startChat = userId => Joi.object().keys({
  title: Joi.string().min(2).max(50).label('Title'),
  userIds: Joi.array().min(1).max(100).unique().items(
    Joi.string().ObjectId().not(userId).label('User Id')
  ).label('User IDs')
})
