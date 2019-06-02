import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import responseHeaderAdderMiddleware from './middleware/response-header'
import errorHandlerMiddleware from './middleware/error-handler'
import loggerMiddleware from './middleware/logger'
import router from './routes'
import { checkDbConnection } from './db/models'

// app.use(dbAdder)

const app = new Koa()

loggerMiddleware(app)

checkDbConnection()

app.use(bodyParser({ enableTypes: 'json' }))

app.use(responseHeaderAdderMiddleware)

app.use(errorHandlerMiddleware)

router(app)

export default app
