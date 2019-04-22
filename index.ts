import app from './src/app'
import config from 'config'
import { Signale } from 'signale'

const {
  application: { port, host },
} = config

const consolePrinter = new Signale({
  types: {
    success: {
      label: `Server available: ${host}:${port}`,
    },
  },
})

export default app.listen(port, host, consolePrinter.success)
