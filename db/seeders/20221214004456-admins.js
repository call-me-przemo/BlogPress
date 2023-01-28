"use strict";
const auth = import("../../helpers.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const { scryptAsync, PASSWORD_SALT } = await auth;
    const now = new Date();

    await queryInterface.bulkInsert("Admins", [
      {
        nick: "AdminOne",
        password: await scryptAsync("adminOnePass", PASSWORD_SALT, 64),
        createdAt: now,
        updatedAt: now,
      },
      {
        nick: "AdminTwo",
        password: await scryptAsync("adminTwoPass", PASSWORD_SALT, 64),
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Admins", null);
  },
};
