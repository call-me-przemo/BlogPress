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

    await queryInterface.bulkInsert("Users", [
      {
        nick: "The user",
        password: await scryptAsync("topsecret123", "The user", 64),
        email: "user@mail.com",
        firstName: "John",
        lastName: "Doe",
        active: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        nick: "Another user",
        password: await scryptAsync("thepassword8", "Another user", 64),
        email: "jane@mail.com",
        firstName: "Jane",
        lastName: "Freeman",
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        nick: "Fast writer",
        password: await scryptAsync("fastWriterPass", "Fast writer", 64),
        email: "writer@mail.com",
        firstName: "Amy",
        lastName: "Lazarus",
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        nick: "Impatient reader",
        password: await scryptAsync("mySecretPass88", "Impatient reader", 64),
        email: "bookworm@library.com",
        firstName: "Mark",
        lastName: "Flatsugar",
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        nick: "Fearless stuntgirl",
        password: await scryptAsync("realBadassGirl", "Fearless stuntgirl", 64),
        email: "ironfemale@whitewhale.org",
        firstName: "Kate",
        lastName: "Jolie",
        active: true,
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
    await queryInterface.bulkDelete("Users", null);
  },
};
