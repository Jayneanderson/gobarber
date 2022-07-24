'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      //relacionamento com usuário
      user_id: {
        type: Sequelize.INTEGER,
        //nome da tabela dentro de model que eu quero referenciar e a chave
        //quero que todo avatar_id da tabela usuário seja um id contido na tabela files
        references: { model: 'users', key: 'id' },
        //se um dia este arquivo for deletado na tabela de usuário, o que eu faço com o avatar id do usuário? Seto nulo
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      //qual é o provedor que vai atender este agendamento?
      provider_id: {
        type: Sequelize.INTEGER,
        //nome da tabela dentro de model que eu quero referenciar e a chave
        //quero que todo avatar_id da tabela usuário seja um id contido na tabela files
        references: { model: 'users', key: 'id' },
        //se um dia este arquivo for deletado na tabela de usuário, o que eu faço com o avatar id do usuário? Seto nulo
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      candeled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
     return queryInterface.dropTable('appointments');
  }
};
