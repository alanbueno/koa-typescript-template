'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user',
      [
        {
          active: true,
          firstName: 'John',
          lastName: 'Doe',
          phone: '',
          email: 'test@test.com',
          pwd: 'test',
          mainRoleId: 1,
          mainTeamId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('user', null, {})
  },
}
