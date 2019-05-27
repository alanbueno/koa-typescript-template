export default {
  application: {
    host: process.env['HOST'] || '0.0.0.0',
    port: process.env['PORT'] || 3001,
    basePath: '',
  },
  sentry: {
    dsn: process.env['SENTRY_DSN_KEY'],
  },
  db: {
    username: 'postgres',
    password: 'pass',
    database: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    force: false,
    timezone: '+00:00',
  },
}
