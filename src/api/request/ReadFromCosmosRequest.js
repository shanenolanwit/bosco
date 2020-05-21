const assert = require('assert');

const GenericRequest = require('./GenericRequest');

module.exports = class ReadFromCosmosRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const { tableName } = req.body;
    assert(tableName, 'tableName is required');
    this.tableName = tableName;
  }

  getTableName() {
    return this.tableName;
  }
};
