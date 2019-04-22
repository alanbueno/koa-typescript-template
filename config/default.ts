export default {
  application: {
    host: process.env['HOST'] || '0.0.0.0',
    port: process.env['PORT'] || 3001,
    basePath: '',
  },
  sentry: {
    dsn: process.env['SENTRY_DSN_KEY'],
  },
}
