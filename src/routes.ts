import Router from 'koa-router'
import packageJson from '../package.json'
import { someResource } from './resources'

const router = new Router()

export default app => {
  router.get('/', ctx => {
    try {
      ctx.body = {
        version: packageJson.version,
        uptime: process.uptime(),
      }
      ctx.status = 200

      return ctx
    } catch (err) {
      ctx.status = 500
    }
  })

  // health check
  router.get('/ping', async ctx => {
    try {
      ctx.body = 'pong'
      ctx.status = 200
    } catch (err) {
      ctx.status = 500
    }
  })

  app.use(router.routes(), router.allowedMethods())
  app.use(someResource.routes(), someResource.allowedMethods())
}
