'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return Promise.all([
      migration.changeColumn('memberships', 'space_id',
        {
          type: DataTypes.STRING,
          references: {
            model: 'spaces',
            key: '_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ),
      migration.changeColumn('artifacts', 'space_id',
        {
          type: DataTypes.STRING,
          references: {
            model: 'spaces',
            key: '_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ),
      migration.changeColumn('messages', 'space_id',
        {
          type: DataTypes.STRING,
          references: {
            model: 'spaces',
            key: '_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      )
    ])
  },

  down: function(migration, DataTypes) {
    return Promise.all([
      migration.changeColumn('memberships', 'space_id',
        {
          type: DataTypes.STRING,
          references: {
            model: 'spaces',
            key: '_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION'
        }
      ),
      migration.changeColumn('artifacts', 'space_id',
        {
          type: DataTypes.STRING,
          references: {
            model: 'spaces',
            key: '_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION'
        }
      ),
      migration.changeColumn('messages', 'space_id',
        {
          type: DataTypes.STRING,
          references: {
            model: 'spaces',
            key: '_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION'
        }
      )
    ])
  }
}
