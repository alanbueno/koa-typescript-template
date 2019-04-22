import app from '../app'
import supertest from 'supertest'
const request = supertest(app.callback())

describe('HealthChecks routes', () => {
  it('/ should return 200', async () => {
    const response = await request.get('/').expect(200)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(expect.any(Object))
  })

  it('/ping should return pong', async () => {
    const response = await request.get('/ping')
    expect(response.status).toBe(200)
    expect(response.text).toEqual('pong')
  })
})
