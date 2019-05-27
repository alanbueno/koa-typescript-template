import config from 'config'
import * as Sentry from '@sentry/node'
import koaLogger from 'koa-logger'
import signale, { Signale } from 'signale'
import Boom from '@hapi/boom'
import packageJson from '../../package.json'

const errorsMap = new Map([[400, 'error'], [401, 'error'], [404, 'info'], [500, 'fatal']])

const customErrors = new Signale({
  types: {
    error: {
      badge: '!',
      label: 'user error',
    },
    fatal: {
      badge: '!!',
      label: 'server error',
    },
  },
})

const consoleLogError = (err: Boom) => {
  const {
    output: { statusCode: errorCode },
  } = err

  const customErrorType = errorsMap.get(errorCode)

  if (customErrorType === 'info') {
    return signale.info(err)
  }

  customErrors[errorsMap.get(err.output.statusCode)](err)
}

const logSentryError = (err: Boom) => {
  consoleLogError(err)

  const {
    output: { statusCode: errorCode },
  } = err

  if (errorsMap.get(errorCode) !== 'fatal') {
    return
  }

  Sentry.captureException(err)
}

export default app => {
  app.use(koaLogger())

  const {
    sentry: { dsn },
  } = config

  if (!dsn) {
    return app.on('error', consoleLogError)
  }

  Sentry.init({
    dsn,
  })

  Sentry.configureScope(
    (scope): void => {
      scope.setTag('version', packageJson.version)
    }
  )

  app.on('error', logSentryError)
}
