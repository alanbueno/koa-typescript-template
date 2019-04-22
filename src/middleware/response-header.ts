import pkg from '../../package.json'
import { ParameterizedContext } from 'koa'

export default async (ctx: ParameterizedContext, next: Function): Promise<any> => {
  const start = Date.now()

  ctx.set({
    environment: process.env.NODE_ENV || 'development',
    version: pkg.version,
  })

  await next()

  ctx.set('x-response-time', `${Math.ceil(Date.now() - start).toString()} ms`)
}
