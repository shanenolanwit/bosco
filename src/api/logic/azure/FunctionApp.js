const assert = require('assert');
const URL = require('url-parse');

module.exports = class FunctionApp {
  constructor({ logger, env, fetch }) {
    assert(logger, 'logger is required');
    assert(env, 'env is required');
    assert(fetch, 'functionLib is required');
    this.logger = logger;
    this.env = env;
    this.fetch = fetch;
  }

  async invoke(invokeFunctionRequest) {
    const url = new URL(invokeFunctionRequest.getFunctionUrl());
    const { host } = url;
    const path = url.pathname + url.query;

    const opts = {
      host,
      path,
      uri: url.href,
      method: 'POST',
      body: JSON.stringify(invokeFunctionRequest.getPayload()),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const res = await this.fetch(url.href, opts);

    const {
      status, statusText
    } = res;

    let body = {};
    let text = '';

    // We are only allowed one attempt at res.anything()
    // res.text() will always return something
    // instead of relying on headers and using res.json(), get the response as text and attempt to parse as json manually
    try {
      text = await res.text();
      body = JSON.parse(text);
    } catch (err) {
      body = { text };
    }
    return {
      status,
      statusText,
      body
    };
  }
};
