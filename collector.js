/* eslint-disable no-await-in-loop */
const fetch = require('node-fetch');
const fs = require('fs');
const shortid = require('shortid');

const { parse } = require('json2csv');

const ONE_MINUTE = 60000;
const FIVE_MINUTES = 300000;
const FIFTEEN_MINUTES = 900000;
const THIRTY_MINUTES = 1800000;
const SIXTY_MINUTES = 3600000;

// eslint-disable-next-line no-unused-vars
const timeSlots = [ONE_MINUTE, FIVE_MINUTES, FIFTEEN_MINUTES, THIRTY_MINUTES, SIXTY_MINUTES];

const payloadForFunction = (provider, functionName, transactionID, strategy, message) => ({
  provider,
  functionName,
  transactionID,
  strategy,
  payload: {
    timestamp: new Date().getTime(),
    message
  }
});

const payloadForDatabaseWrite = (provider, tableName, transactionID, strategy, message) => ({
  provider,
  tableName,
  strategy,
  transactionID,
  timestamp: new Date().getTime(),
  message
});

const payloadForDatabaseRead = (provider, tableName, transactionID, strategy) => ({
  provider,
  tableName,
  strategy,
  transactionID
});

const payloadForFileWrite = (provider, bucketName, transactionID, strategy, message) => ({
  provider,
  bucketName,
  strategy,
  transactionID,
  timestamp: new Date().getTime(),
  message
});

const payloadForFileRead = (provider, bucketName, transactionID, strategy) => ({
  provider,
  bucketName,
  strategy,
  transactionID
});

const post = async (endpoint, payload) => {
  const url = new URL(endpoint);
  const { host } = url;
  const path = url.pathname + url.query;

  const opts = {
    host,
    path,
    uri: url.href,
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'abc123'
    }
  };

  const res = await fetch(url.href, opts);

  const json = await res.json();

  return json;
};

const collect = async (endpoint, payload, transactionID) => {
  const myData = [];
  for (let i = 0; i < 1; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const res = await post(endpoint, payload);
    myData.push(res.data);
  }


  //   const fields = ['field1', 'field2', 'field3'];
  //   const opts = { fields };
  const fields = [
    'status',
    'startTime',
    'endTime',
    'duration',
    'provider',
    'service',
    'action',
    'transactionID',
    'strategy'
  ];
  const opts = { header: false, fields };
  try {
    const csv = `${parse(myData, opts)}\n`;
    console.log(csv);
    const fileName = 'results/tx.csv';
    // console.log(fileName);
    fs.appendFileSync(fileName, csv);
  } catch (err) {
    console.error(err);
  }
};


const click = async () => {
  for (let i = 0; i < 400; i += 1) {
    console.log(`round ${i} collect data started at ${new Date()}`);
    const transactionID = shortid.generate();
    await collect('http://localhost:3000/bosco/executeFunction',
      payloadForFunction('aws', 'aws-nodejs-dev-sayHello', transactionID, 'BASE', 'yo'), transactionID);
    await collect('http://localhost:3000/bosco/executeFunction',
      payloadForFunction('azure', 'https://tx-cloudy-dayz.azurewebsites.net/api/HttpTrigger1', transactionID, 'BASE', 'yo'), transactionID);


    await collect('http://localhost:3000/bosco/writeToDatabase',
      payloadForDatabaseWrite('aws', 'hellodb', transactionID, 'BASE', 'yo'), transactionID);
    await collect('http://localhost:3000/bosco/writeToDatabase',
      payloadForDatabaseWrite('azure', 'transaction', transactionID, 'BASE', 'yo'), transactionID);

    await collect('http://localhost:3000/bosco/readFromDatabase',
      payloadForDatabaseRead('aws', 'hellodb', transactionID, 'BASE'), transactionID);
    await collect('http://localhost:3000/bosco/readFromDatabase',
      payloadForDatabaseRead('azure', 'transaction', transactionID, 'BASE'), transactionID);

    await collect('http://localhost:3000/bosco/writeToFile',
      payloadForFileWrite('aws', 'cloudy-dayz-bucket', transactionID, 'BASE'), transactionID);
    await collect('http://localhost:3000/bosco/writeToFile',
      payloadForFileWrite('azure', 'cloudy-dayz-bucket', transactionID, 'BASE', 'yo'), transactionID);

    await collect('http://localhost:3000/bosco/readFromFile',
      payloadForFileRead('aws', 'cloudy-dayz-bucket', transactionID, 'BASE', 'yo'), transactionID);
    await collect('http://localhost:3000/bosco/readFromFile',
      payloadForFileRead('azure', 'cloudy-dayz-bucket', transactionID, 'BASE', 'yo'), transactionID);

    // console.log(`round ${i} collect data finished at ${new Date()}`);
    // const timeout = FIVE_MINUTES;
    const timeout = 50;
    // console.log(`going to sleep now, see you in ${timeout} mins`);
    await new Promise((resolve, reject) => {
      // wait for 50 ms.
      setTimeout(() => { resolve(); }, timeout);
    });
    // console.log('awake again, ready to go at it again');
  }
  console.log('finished');
};

click();
