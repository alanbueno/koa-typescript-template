import config from 'config'
import Router from 'koa-router'
import somePostHandler from './someResource.controller'

const router = new Router({ prefix: config.application.basePath })

router.post('/somePost', somePostHandler)

export default router
