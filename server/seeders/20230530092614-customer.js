'use strict';
const { hashPassword } = require('../helpers/bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const customers = require('../customers.json')
    customers.forEach(customer => {
      customer.password = hashPassword(customer.password)
      customer.createdAt = customer.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Customers", customers, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Customers", customers, {})
  }
};
