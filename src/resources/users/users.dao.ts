import db from '../../db/models'

const getUsers = async () => {
  const userModal = db.User
  try {
    const users = await userModal.findAll()
    return users
  } catch (error) {
    console.error('error inside', error)
  }
}

export default {
  getUsers,
}
