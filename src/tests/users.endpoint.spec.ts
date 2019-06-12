import app from '../app'
import supertest from 'supertest'
import config from 'config'
import { syncDb } from '../db/models'
const request = supertest(app.listen())

const {
  application: { basePath },
} = config

beforeEach(async () => {
  await syncDb()
})

describe('GET - /users', () => {
  it('Should return successfully', async () => {
    const response = await request.get(`${basePath}/users`)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual({
      users: [],
      first: 'Test',
      second: 'Another test',
      number: 1,
      flag: true,
    })
  })
})
