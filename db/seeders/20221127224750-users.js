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

    await queryInterface.bulkInsert("Users", [
      {
        nick: "The user",
        password: await scryptAsync("topsecret123", "The user", 64),
        email: "user@mail.com",
        firstName: "John",
        lastName: "Doe",
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nick: "Another user",
        password: await scryptAsync("thepassword8", "Another user", 64),
        email: "jane@mail.com",
        firstName: "Jane",
        lastName: "Freeman",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("Users", null);
  },
};
