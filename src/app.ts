import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import responseHeaderAdderMiddleware from './middleware/response-header'
import dbAdder from './middleware/db-adder'
import errorHandlerMiddleware from './middleware/error-handler'
import loggerMiddleware from './middleware/logger'
import router from './routes'

const app = new Koa()

loggerMiddleware(app)

app.use(dbAdder)

app.use(bodyParser({ enableTypes: 'json' }))

app.use(responseHeaderAdderMiddleware)

app.use(errorHandlerMiddleware)

router(app)

export default app
