// import db from '../db/models'
import Boom from '@hapi/boom'
import { ParameterizedContext } from 'koa'

export interface CustomContext {
  db: any
}

export default async (ctx: ParameterizedContext<CustomContext>, next: Function): Promise<any> => {
  try {
    // ctx.state.db = db

    await next()
  } catch (e) {
    throw Boom.boomify(e, {
      message: 'ErrorWhileAddingTheDbToTheContext',
    })
  }
}
