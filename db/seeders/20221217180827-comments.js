"use strict";

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
    const now = new Date();
    await queryInterface.bulkInsert("Comments", [
      {
        UserId: 1,
        PostId: 3,
        rate: 3,
        content: "Great article but could be better",
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 5,
        PostId: 1,
        rate: 4,
        content: "Very valueable text",
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 2,
        PostId: 7,
        rate: 1,
        content: "Completely bullshit",
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 5,
        PostId: 6,
        rate: 3,
        content: "So so",
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 5,
        PostId: 1,
        rate: 4,
        content: "Not bad",
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 5,
        PostId: 4,
        rate: 5,
        content: "Absolutely masterpiece",
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 3,
        PostId: 6,
        rate: 2,
        content: "Don't know what to write about it",
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 2,
        PostId: 1,
        rate: 4,
        content: "Good job :0",
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
    await queryInterface.bulkDelete("Comments", null);
  },
};
