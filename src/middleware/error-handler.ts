import Boom from '@hapi/boom'
import { ParameterizedContext } from 'koa'

export default async (ctx: ParameterizedContext, next: Function): Promise<any> => {
  try {
    await next()

    const status = ctx.status || 404
    if (status === 404) {
      throw Boom.notFound('Resource not found')
    }
  } catch (error) {
    ctx.status = error.isJoi ? 400 : error.isBoom ? error.output.statusCode : error.status || 500

    const boomError: Boom = error.isBoom ? error : Boom.boomify(error, { statusCode: ctx.status })

    ctx.body = boomError.output.payload

    ctx.app.emit('error', boomError)
  }
}
