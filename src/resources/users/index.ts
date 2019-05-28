import config from 'config'
import Router from 'koa-router'
import usersAction from './users.action'

const router = new Router({ prefix: config.application.basePath })

router.get('/users', usersAction)
// router.get('/user/:id', userAction)

export default router
