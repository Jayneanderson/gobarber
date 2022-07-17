'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'avatar_id',
      {
        type: Sequelize.INTEGER,
        //nome da tabela dentro de model que eu quero referenciar e a chave
        //quero que todo avatar_id da tabela usuário seja um id contido na tabela files
        references: { model: 'files', key: 'id' },
        //se um dia este arquivo for deletado na tabela de usuário, o que eu faço com o avatar id do usuário? Seto nulo
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      });
  },

  down: queryInterface => {
    return this.queryInterface.removeColumn('users', 'avatar_id');
  },
};
