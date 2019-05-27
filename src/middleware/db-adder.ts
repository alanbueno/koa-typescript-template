import db from '../db/models'
import Boom from '@hapi/boom'
import { ParameterizedContext } from 'koa'

export interface ICustomContext {
  db: any
}

export default async (ctx: ParameterizedContext<ICustomContext>, next: Function): Promise<any> => {
  try {
    ctx.state.db = db

    await next()
  } catch (e) {
    throw Boom.boomify(e, {
      message: 'ErrorWhileAddingTheDbToTheContext',
    })
  }
}
