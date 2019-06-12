import config from 'config'
import { readdirSync } from 'fs'
import { basename, join } from 'path'
import { Sequelize } from 'sequelize'

// Importing model specification from its own definition file.
import { User } from './user'
import { Role } from './role'
import { Team } from './team'

export interface DbConnection {
  sequelize: Sequelize
  User: typeof User
  Role: typeof Role
  Team: typeof Team
}

let db: any = {}

const { db: dbConfig } = config

// defining db connection
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

if (process.env['NODE_ENV'] === 'development') {
  /* sync({ logging: dbConfig.logging || false, // false=no Logs or value=function that log sql queries }) */
  sequelize
    .sync()
    .then(() => {
      console.log('Db has been synced successfully.')
    })
    .catch(err => {
      console.error('Unable to sync the database:', err)
    })
}

// importing models
const indexModel = basename(module.filename)
const validExtensions = ['.js', '.ts']
const modelFiles = readdirSync(__dirname).filter(
  file => file !== indexModel && file.indexOf('.') !== 0 && validExtensions.includes(file.slice(-3))
  // if you want to go fancy and use regex instead
  // file => file !== indexModel && file.match(/\.[js|ts]+$/i)[0]
)

modelFiles.forEach(file => {
  const model = sequelize.import(join(__dirname, file))
  // NOTE: bracket notation or tsc will complain about undefined property.
  db[model['name']] = model
})

for (const modelName in db) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
}

db.sequelize = sequelize

export const checkDbConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('DB Ok')
  } catch (error) {
    console.error(error)
  }
}

export const syncDb = async () => {
  try {
    await sequelize.sync()
  } catch (error) {
    console.error(error)
  }
}

export default db as DbConnection
