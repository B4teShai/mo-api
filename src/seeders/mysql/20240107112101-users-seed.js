'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        firstName: 'Mo',
        lastName: 'Mo',
        phoneNumber: '99999999',
        email: 'user@example.tdl',
        password: await bcrypt.hash('superPa$$', await bcrypt.genSalt(10)),
        role: ['SUPER_ADMIN'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
