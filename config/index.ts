import nodeConfig from '../node_modules/config/lib/config.js'
import { IConfig } from '../node_modules/@types/config'
import defaultConfig from './default'
import { Dialect } from 'sequelize'

export interface AppConfig extends IConfig {
  application: {
    host: string
    port: number
    basePath: string
  }
  sentry: {
    dsn: string
  }
  db: {
    username: string
    password: string
    database: string
    host: string
    port: number
    dialect: Dialect
    logging: boolean
    force: false
    timezone: string
  }
}

const appConfig = {}
for (const key in defaultConfig) {
  appConfig[key] = nodeConfig.get(key)
}

export const config: AppConfig = { ...appConfig, ...nodeConfig }
export default config
