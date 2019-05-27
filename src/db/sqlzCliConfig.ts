import config from 'config'
const { username, password, database, host, dialect } = config.db

const dbConfig = {
  username,
  password,
  database,
  host,
  dialect,
}

export default {
  // the different configs according to the environment
  // are being set by the 'config' package
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
}
