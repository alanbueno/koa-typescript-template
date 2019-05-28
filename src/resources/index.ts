import { RouterContext } from 'koa-router'

import users from './users'

// RouterContext has CustomT and State that can be used
export type RouteHandler<TReturnFunc = any> = (ctx: RouterContext) => Promise<TReturnFunc>

export { users }
