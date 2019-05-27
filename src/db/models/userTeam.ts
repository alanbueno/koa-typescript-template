import { Sequelize, Model, DataTypes } from 'sequelize'

import { User } from './user'
import { Team } from './team'

type UserTeamAttributes = {
  teamId: number
  userId: number
  status: boolean
}

type UserTeamInstance = {
  teamId: number
  userId: number
  status: boolean

  // auto added
  createdAt: Date
  updatedAt: Date
}

type TeamUserAssociations = {
  Team: typeof Team
  User: typeof User
}

export class UserTeam extends Model<UserTeamInstance, UserTeamAttributes> {
  // pk will be the combination of userId and teamId columns
  public userId!: number
  public teamId!: number
  public status!: boolean

  public static associate({ Team, User }: TeamUserAssociations): void {
    User.belongsToMany(Team, {
      as: 'ThisUserTeam',
      through: UserTeam, // n:m model - reference to userTeam table that'll hold the relation
      foreignKey: 'userId', // custom user fk on userROle table
    })

    Team.belongsToMany(User, {
      as: 'ThisTeamUser',
      through: UserTeam, // n:m model - reference to userTeam table that'll hold the relation
      foreignKey: 'teamId', // custom team fk on userTeam table
    })
  }
}

export default (sequelize: Sequelize): typeof UserTeam => {
  UserTeam.init(
    {
      userId: DataTypes.INTEGER.UNSIGNED,
      teamId: DataTypes.INTEGER.UNSIGNED,
      status: DataTypes.BOOLEAN,
    },
    {
      tableName: 'userTeam',
      sequelize,
      // indexes: [{ unique: true }],
    }
  )

  return UserTeam
}
