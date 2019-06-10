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
    username: process.env['DB_USERNAME'] || 'postgres',
    password: process.env['DB_PASSWORD'] || 'pass',
    database: process.env['DB_NAME'] || 'postgres',
    host: process.env['DB_HOSTNAME'] || '127.0.0.1',
    port: process.env['DB_PORT'] || 5432,
    dialect: process.env['DB_DIALECT'] || 'postgres',
    logging: false,
    force: false,
    timezone: '+00:00',
  },
}
