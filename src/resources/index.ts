import { RouterContext } from 'koa-router'

import someResource from './someResource'

// RouterContext has CustomT and State that can be used
export type Resource<TReturnFunc = any> = (ctx: RouterContext) => Promise<TReturnFunc>

export { someResource }
