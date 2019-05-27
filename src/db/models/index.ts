import config from 'config'
import { readdirSync } from 'fs'
import { basename, join } from 'path'
import { Sequelize } from 'sequelize'

// Importing model specification from its own definition file.
import { User } from './user'
import { Role } from './role'
import { Team } from './team'

export interface IDbConnection {
  sequelize: Sequelize
  User: User
  Role: Role
  Team: Team
}

const { db: dbConfig } = config
// defining db connection
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

// defining db obj
let db: IDbConnection = {
  sequelize,
  User: null,
  Role: null,
  Team: null,
}

// connecting to db
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// sync if needed
sequelize
  .sync(/* { logging: dbConfig.logging || false, // false=no Logs or value=function that log sql queries } */)
  .then(() => {
    console.log('Db has been synced successfully.')
  })
  .catch(err => {
    console.error('Unable to sync the database:', err)
  })

// importing models
const indexModel = basename(module.filename)
const modelFiles = readdirSync(__dirname).filter(
  file => file.indexOf('.') !== 0 && file !== indexModel && file.slice(-3) === '.js'
)

modelFiles.forEach(file => {
  const model = sequelize.import(join(__dirname, file))
  // NOTE: bracket notation or tsc will complain about undefined property.
  db[model['name']] = model
})

for (const modelName in db) {
  if (db[modelName].associate) db[modelName].associate(db)
}

db.sequelize = sequelize

export default db
