import Joi from '@hapi/joi'
import { createValidation } from '@admin/utils'

export default createValidation(
  // schema
  {
    someParameter: Joi.string(),
    body: Joi.object(),
  },
  // picking up just the attributes that we want
  ({ params: { someParameter }, body }) => ({
    someParameter,
    body,
  })
)
