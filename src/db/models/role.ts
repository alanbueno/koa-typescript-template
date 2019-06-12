import {
  Sequelize,
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  Association,
} from 'sequelize'

import { User } from './user'

interface RoleAttributes {
  id?: number
  active: boolean
  name: string
  description?: string
}

interface RoleInstance {
  readonly id: string
  active: boolean
  name: string
  description?: string

  // auto added
  createdAt: Date
  updatedAt: Date
}

interface RoleAssociation {
  Role: typeof Role
  User: typeof User
}

export class Role extends Model<RoleInstance, RoleAttributes> {
  public id!: number // Note that the `null assertion` `!` is required in strict mode.
  public active!: string
  public name!: string
  public description!: string | null // for nullable fields

  // getThisRoleUsers, setThisRoleUsers, addThisRoleUser, addThisRoleUsers
  // due to the mutual belongsToMany associations

  public getThisRoleUsers!: BelongsToManyGetAssociationsMixin<User> // Note the null assertions!
  public setThisRoleUsers!: BelongsToManySetAssociationsMixin<User, number>
  public addThisRoleUser!: BelongsToManyAddAssociationMixin<User, number>
  public addThisRoleUsers!: BelongsToManyAddAssociationsMixin<User, number>

  public hasThisRoleUser!: BelongsToManyHasAssociationMixin<User, number>
  public countThisRoleUsers!: BelongsToManyCountAssociationsMixin
  public createThisRoleUser!: BelongsToManyCreateAssociationMixin<User>

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly thisRoleUsers?: User[] // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    thisRoleUser: Association<Role, User>
  }

  public static associate({ Role, User }: RoleAssociation) {
    Role.hasMany(User, { foreignKey: 'mainRoleId' })
  }
}

export default (sequelize: Sequelize): typeof Role => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER, // UNSIGNED Warning: PostgresSQL does not support 'INTEGER' with LENGTH, UNSIGNED or ZEROFILL. Plain 'INTEGER' will be used instead.
        autoIncrement: true,
        primaryKey: true,
      },
      active: DataTypes.BOOLEAN,
      name: new DataTypes.STRING(64),
      description: new DataTypes.STRING(128),
    },
    {
      tableName: 'role',
      sequelize,
      // indexes: [{ unique: true }],
    }
  )

  return Role
}
