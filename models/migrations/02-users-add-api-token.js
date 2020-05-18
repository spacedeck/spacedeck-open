'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return Promise.all([
      migration.addColumn('users', 'api_token',
        {
          type: DataTypes.STRING
        }
      )
    ])
  },

  down: function(migration, DataTypes) {
    return Promise.all([
      migration.removeColumn('users', 'api_token')
    ])
  }
}
