import { Sequelize, Model, DataTypes } from 'sequelize'

import { User } from './user'
import { Role } from './role'

type UserRoleAttributes = {
  roleId: number
  userId: number
  status: boolean
}

type UserRoleInstance = {
  roleId: number
  userId: number
  status: boolean

  // auto added
  createdAt: Date
  updatedAt: Date
}

type RoleUserAssociations = {
  Role: typeof Role
  User: typeof User
}

export class UserRole extends Model<UserRoleInstance, UserRoleAttributes> {
  // pk will be the combination of userId and roleId columns
  public userId!: number
  public roleId!: number
  public status!: boolean

  public static associate({ Role, User }: RoleUserAssociations): void {
    User.belongsToMany(Role, {
      as: 'ThisUserRole',
      through: UserRole, // n:m model - reference to userRole table that'll hold the relation
      foreignKey: 'userId', // custom user fk on userROle table
    })

    Role.belongsToMany(User, {
      as: 'ThisRoleUser',
      through: UserRole, // n:m model - reference to userRole table that'll hold the relation
      foreignKey: 'roleId', // custom role fk on userRole table
    })
  }
}

export default (sequelize: Sequelize): typeof UserRole => {
  UserRole.init(
    {
      userId: DataTypes.INTEGER.UNSIGNED,
      roleId: DataTypes.INTEGER.UNSIGNED,
      status: DataTypes.BOOLEAN,
    },
    {
      tableName: 'userRole',
      sequelize,
      // indexes: [{ unique: true }],
    }
  )

  return UserRole
}
