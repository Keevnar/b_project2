'use strict';

const table = 'cards'
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable(table, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncremenet: true
      },
      listId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lists',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      name:        { type: Sequelize.STRING,  allowNull: false },
      description: { type: Sequelize.STRING,  allowNull: false },
      order:       { type: Sequelize.INTEGER, allowNull: false }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable(table);
  }
};
