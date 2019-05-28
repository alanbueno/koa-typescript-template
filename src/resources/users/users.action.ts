import { RouteHandler } from '..'
import Boom from '@hapi/boom'
import usersCommand from './users.command'
import usersValidation from './users.validation'

const usersHandler: RouteHandler<void> = async ctx => {
  try {
    usersValidation(ctx)

    await usersCommand(ctx)
  } catch (e) {
    // in case of non actionable problems, usually caused by dependencies
    // breadcrumbs might be handy to find the root cause of the errors
    // check below

    // import * as Sentry from '@sentry/node'
    // Sentry.addBreadcrumb({
    //   category: 'dependence',
    //   message: 'The dependence x is down',
    //   level: Sentry.Severity.Critical,
    // })

    throw Boom.boomify(e, {
      message: 'UsersHandlerFailed',
    })
  }
}

export default usersHandler
