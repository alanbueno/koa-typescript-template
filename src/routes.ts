import Router from 'koa-router'
import packageJson from '../package.json'
import { auth, machines, merchant, product, purchase, users } from './resources'

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
  app.use(auth.routes())
  app.use(machines.routes(), machines.allowedMethods())
  app.use(merchant.routes(), merchant.allowedMethods())
  app.use(product.routes(), product.allowedMethods())
  app.use(purchase.routes(), purchase.allowedMethods())
  app.use(users.routes(), users.allowedMethods())
}
