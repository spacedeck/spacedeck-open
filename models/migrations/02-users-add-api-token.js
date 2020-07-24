'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return Promise.all([
      migration.changeColumn('users', 'api_token',
        {
          type: DataTypes.STRING
        }
      )
    ])
  },

  down: function(migration, DataTypes) {
    return Promise.all([
      migration.changeColumn('users', 'api_token',
        {
          type: Sequelize.STRING
        }
      )
    ])
  }
}
