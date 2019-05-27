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

import { Role } from './role'
import { Team } from './team'

type UserAttributes = {
  id?: number
  active: boolean
  avatar?: string
  email?: string
  firstName: string
  lastName?: string
  notification?: boolean
  phone?: string
  pwd: string
  mainRoleId: string
}

type UserInstance = {
  readonly id: string
  active: boolean
  firstName: string
  email: string
  pwd: string

  // fk
  mainRoleId: string

  // auto added
  createdAt: Date
  updatedAt: Date
}

type UserAssociations = {
  User: typeof User
  Role: typeof Role
}

export class User extends Model<UserInstance, UserAttributes> {
  public id!: number // Note that the `null assertion` `!` is required in strict mode.
  public active!: string
  public firstName!: string
  public email!: string | null // for nullable fields
  public pwd!: string

  // fk
  public mainRoleId: number
  public mainTeamId: number

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // getThisUserRoles, setThisUserRoles, addThisUserRole, and addThisUserRoles
  // due to the mutual belongsToMany associations

  public getThisUserRoles!: BelongsToManyGetAssociationsMixin<Role> // Note the null assertions!
  public setThisUserRoles!: BelongsToManySetAssociationsMixin<Role, number>
  public addThisUserRole!: BelongsToManyAddAssociationMixin<Role, number>
  public addThisUserRoles!: BelongsToManyAddAssociationsMixin<Role, number>

  public hasThisUserRole!: BelongsToManyHasAssociationMixin<Role, number>
  public countThisUserRoles!: BelongsToManyHasAssociationMixin<Role, number>
  public createThisUserRole!: BelongsToManyCreateAssociationMixin<Role>

  public getThisUserTeams!: BelongsToManyGetAssociationsMixin<Team> // Note the null assertions!
  public setThisUserTeams!: BelongsToManySetAssociationsMixin<Team, number>
  public addThisUserTeam!: BelongsToManyAddAssociationMixin<Team, number>
  public addThisUserTeams!: BelongsToManyAddAssociationsMixin<Team, number>

  public hasThisUserTeam!: BelongsToManyHasAssociationMixin<Team, number>
  public countThisUserTeams!: BelongsToManyCountAssociationsMixin
  public createThisUserTeam!: BelongsToManyCreateAssociationMixin<Team>

  // // You can also pre-declare possible inclusions, these will only be populated if you
  // // actively include a relation.
  public readonly thisUserRoles?: Role[] // Note this is optional since it's only populated when explicitly requested in code
  public readonly thisUserTeams?: Team[]

  public static associations: {
    thisUserRole: Association<User, Role>
    thisUserTeam: Association<User, Team>
  }

  public associate({ Role, User }: UserAssociations): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    User.belongsTo(Role, { as: 'mainRoleAssociation', foreignKey: 'mainRoleId' })
  }
}

export default (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      firstName: {
        type: new DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^[a-z]+$/i, // regex for just letters
        },
      },
      mainRoleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      pwd: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'user',
      sequelize: sequelize, // this bit is important
    }
  )
  return User
}
