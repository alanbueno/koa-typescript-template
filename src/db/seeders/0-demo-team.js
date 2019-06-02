'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'team',
      [
        {
          active: true,
          name: 'foundations',
          description: 'trusted contributor for admin tasks',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          active: true,
          name: 'restocker',
          description: 'access just to the stock management tools',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          active: true,
          name: 'support',
          description: 'first line of support',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('team', null, {})
  },
}
