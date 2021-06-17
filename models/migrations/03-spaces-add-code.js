'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return Promise.all([
      migration.addColumn('spaces', 'code',
        {
          type: DataTypes.STRING,
          unique: true
        }
      )
    ])
  },

  down: function(migration, DataTypes) {
    return Promise.all([
      migration.removeColumn('spaces', 'code',
        {
          type: Sequelize.STRING,
          unique: true
        }
      )
    ])
  }
}
