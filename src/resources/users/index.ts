import config from 'config'
import Router from 'koa-router'
import somePostAction from './someResource.action'

const router = new Router({ prefix: config.application.basePath })

router.get('/user', somePostAction)
router.get('/user/:id', somePostAction)

export default router
