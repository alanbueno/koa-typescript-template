import { Resource } from '..'
import Boom from '@hapi/boom'

const someResourceHandler: Resource<void> = async ctx => {
  try {
    ctx.body = {
      first: 'Test',
      second: 'Another test',
      number: 1,
      flag: true,
    }
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
      message: 'SomeResourceFailed',
    })
  }
}

export default someResourceHandler
