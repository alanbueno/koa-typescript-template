import usersDao from './users.dao'
// const usersDao = { getUsers: () => [] }

export default async ctx => {
  const users = await usersDao.getUsers()

  ctx.body = {
    users: users,
    first: 'Test',
    second: 'Another test',
    number: 1,
    flag: true,
  }
}
