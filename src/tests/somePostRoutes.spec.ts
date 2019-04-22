import app from '../app'
import supertest from 'supertest'
import config from 'config'
const request = supertest(app.callback())

const {
  application: { basePath },
} = config

describe('POST - /somePost', () => {
  it('Should return successfully', async () => {
    const response = await request.post(`${basePath}/somePost`)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual({
      first: 'Test',
      second: 'Another test',
      number: 1,
      flag: true,
    })
  })
})
