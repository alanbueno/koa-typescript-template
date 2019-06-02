'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'role',
      [
        {
          active: true,
          name: 'intern',
          description: 'starting to learn the job',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          active: true,
          name: 'operator',
          description: 'knows how to do stuff but in a limited way',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          active: true,
          name: 'experienced',
          description: 'knows and do lots of stuff',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('role', null, {})
  },
}
