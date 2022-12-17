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
    await queryInterface.bulkInsert("Authors", [
      {
        UserId: 1,
        PostId: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 2,
        PostId: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 1,
        PostId: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 1,
        PostId: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 3,
        PostId: 4,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 4,
        PostId: 5,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 3,
        PostId: 6,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 1,
        PostId: 6,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 2,
        PostId: 6,
        createdAt: now,
        updatedAt: now,
      },
      {
        UserId: 3,
        PostId: 7,
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
    await queryInterface.bulkDelete("Authors", null);
  },
};
