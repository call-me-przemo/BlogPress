"use strict";
const auth = import("../../auth/index.js");

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

    const { scryptAsync } = await auth;
    const now = new Date();

    await queryInterface.bulkInsert("Admins", [
      {
        nick: "AdminOne",
        password: await scryptAsync("adminOnePass", "AdminOne", 64),
        createdAt: now,
        updatedAt: now,
      },
      {
        nick: "AdminTwo",
        password: await scryptAsync("adminTwoPass", "AdminTwo", 64),
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
