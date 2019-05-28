import Joi from '@hapi/joi'
import Boom from '@hapi/boom'
import { RouterContext } from 'koa-router'

export default (schema: object, dataDestructuringFunction: Function) => (ctx: RouterContext) => {
  const dataToBeValidated = dataDestructuringFunction(ctx)
  const { error, value } = Joi.validate(dataToBeValidated, schema)

  if (error) {
    throw Boom.badRequest()
  }

  return value
}
