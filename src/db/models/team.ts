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

type TeamAttributes = {
  id?: number
  active: boolean
  name: string
  description?: string
}

type TeamInstance = {
  readonly id: string
  active: boolean
  name: string
  description?: string

  // auto added
  createdAt: Date
  updatedAt: Date
}

type TeamAssociation = {
  Team: typeof Team
  User: typeof User
}

export class Team extends Model<TeamInstance, TeamAttributes> {
  public id!: number // Note that the `null assertion` `!` is required in strict mode.
  public active!: string
  public name!: string
  public description!: string | null // for nullable fields

  // getThisTeamUsers, setThisTeamUsers, addThisTeamUser, addThisTeamUsers
  // due to the mutual belongsToMany associations

  public getThisTeamUsers!: BelongsToManyGetAssociationsMixin<User> // Note the null assertions!
  public setThisTeamUsers!: BelongsToManySetAssociationsMixin<User, number>
  public addThisTeamUser!: BelongsToManyAddAssociationMixin<User, number>
  public addThisTeamUsers!: BelongsToManyAddAssociationsMixin<User, number>

  public hasThisTeamUser!: BelongsToManyHasAssociationMixin<User, number>
  public countThisTeamUsers!: BelongsToManyCountAssociationsMixin
  public createThisTeamUser!: BelongsToManyCreateAssociationMixin<User>

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly thisTeamUsers?: User[] // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    thisTeamUser: Association<Team, User>
  }

  public static associate({ Team, User }: TeamAssociation) {
    Team.hasMany(User, { foreignKey: 'mainTeamId' })
  }
}

export default (sequelize: Sequelize): typeof Team => {
  Team.init(
    {
      active: DataTypes.BOOLEAN,
      name: new DataTypes.STRING(64),
      description: new DataTypes.STRING(128),
    },
    {
      tableName: 'team',
      sequelize,
      // indexes: [{ unique: true }],
    }
  )

  return Team
}
