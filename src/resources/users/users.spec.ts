import usersAction from './users.action'

describe('Low level test for someResource', () => {
  it('Should   set the ctx body ', async () => {
    let ctx = {
      params: { someParameter: 'testParam' },
      body: {},
    }
    await usersAction(ctx as any)
    expect(ctx.body).toEqual({
      users: [],
      first: 'Test',
      second: 'Another test',
      number: 1,
      flag: true,
    })
  })
})
