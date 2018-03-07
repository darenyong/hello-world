var DiskAdapter = require('sails-disk');
var MongoAdapter = require('sails-mongo');
var config = require('config');

module.exports = {
  adapters: {
    'sails-disk': DiskAdapter,
    'sails-mongo': MongoAdapter
  },
  datastores: {
    default: {
      adapter: 'sails-disk',
    },
    mongo: {
      adapter: 'sails-mongo',
      url: config.dbConfig.connection,
    }
  },
  models: {
    message: {
      datastore: 'mongo',
      schema: true,
      attributes: {
        text: { type: 'string', required: true },
      }
    }
  },
  defaultModelSettings: {
    primaryKey: '_id',
    datastore: 'default',
    attributes: {
      _id: { type: 'number', autoMigrations: { autoIncrement: true } },
    }
  }
}
