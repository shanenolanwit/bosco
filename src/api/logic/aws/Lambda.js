const assert = require('assert');

module.exports = class Lambda {
  constructor({ logger, env, lambdaLib }) {
    assert(logger, 'logger is required');
    assert(env, 'env is required');
    assert(lambdaLib, 'lambdaLib is required');
    this.logger = logger;
    this.env = env;
    this.lambdaLib = lambdaLib;
  }

  async invoke(invokeLambdaRequest) {
    const params = {
      FunctionName: invokeLambdaRequest.getFunctionName(),
      InvocationType: invokeLambdaRequest.getInvocationType(),
      LogType: invokeLambdaRequest.getLogType(),
      Payload: JSON.stringify(invokeLambdaRequest.getPayload())
    };
    return this.lambdaLib.invoke(params).promise();
  }
};
