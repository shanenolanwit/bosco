const assert = require('assert');

const GenericRequest = require('./GenericRequest');

module.exports = class WriteToDynamoRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const { tableName, payload } = req.body;
    assert(tableName, 'tableName is required');
    assert(payload, 'payload is required');
    this.tableName = tableName;
    this.payload = payload;
  }

  getTableName() {
    return this.tableName;
  }

  getPayload() {
    return this.payload;
  }
};
