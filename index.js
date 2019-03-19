const feathers = require("@feathersjs/feathers");
const express = require('@feathersjs/express');

const app = express(feathers());

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

async function getAccounts() {
  return await web3.eth.getAccounts();
}

async function getBalance(account) {
  return await web3.eth.getBalance(account);
}

async function subscribeAccount(account) {
  web3.eth.subscribe("logs", {
    account: account,
    topic: [""]
  });
}

function subscribePendingTransactions() {
  this.subscribePendingTransactions = web3.eth
    .subscribe("pendingTransactions", (error, result) => {
      if (!error) console.log(result);
      else console.log(error);
    })
    .on("data", transaction => {
      console.log(transaction);
    });
}

function watchfilter() {
  // can be 'latest' or 'pending'
  var filter = web3.eth.filter("latest");
  // OR object are log filter options
  var filter = web3.eth.filter(options);
  // watch for changes
  filter.watch(function(error, result) {
    if (!error) console.log(result);
  });
  // Additionally you can start watching right away, by passing a callback:
  web3.eth.filter(options, function(error, result) {
    if (!error) console.log(result);
  });
}

async function getData() {
  const accounts = await getAccounts();

  console.log(accounts);

  accounts.map(async account => {
    const balance = await getBalance(account);
    console.log(`${account} :  ${balance}`);
  });

  // subscribePendingTransactions();

  watchfilter();
}

getData();
// const web3Service = require("./web3Service");

// app.configure(web3Service);

// app.use("messages", new Messages());
// async function getAccounts() {
//   const service = app.service("web3Service");
//   service.patch("0x0eFC6225aEF320d61e2620B24b147F84f4E95a46");
//   const accounts = await service.find();

//   console.log(accounts);

//   accounts.map(async account => {
//     const balance = await service.get(account);
//     console.log(`${account} :  ${balance}`);
//   });
// }

// getBalance("0x12334455");

// getAccounts();

app.listen(3030, "localhost", () => {
  console.log("Server listening port 3030 ...");
});
