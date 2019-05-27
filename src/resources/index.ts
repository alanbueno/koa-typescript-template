import { RouterContext } from 'koa-router'

import auth from './auth'
import machines from './machines'
import merchant from './merchant'
import product from './product'
import purchase from './purchase'
import users from './users'

// RouterContext has CustomT and State that can be used
export type Resource<TReturnFunc = any> = (ctx: RouterContext) => Promise<TReturnFunc>

export { auth, machines, merchant, product, purchase, users }
