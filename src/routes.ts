import Router from 'koa-router'
import packageJson from '../package.json'
import db from './db/models'
import { users } from './resources'

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

  // health check database
  router.get('/db', async ctx => {
    try {
      await db.sequelize.authenticate()
      ctx.body = 'ok'
      ctx.status = 200
    } catch (err) {
      ctx.status = 500
      ctx.body = 'not able to reach db'
    }
  })

  app.use(router.routes(), router.allowedMethods())
  app.use(users.routes(), users.allowedMethods())
}
