const Web3 = require("web3");

class Web3Service {
  constructor() {
    this.accounts = [];
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
  }

  //   async getBalance(account) {
  //     await this.web3.eth.getBalance(account);
  //   }

  //   async getAccounts() {
  //     return await this.web3.eth.getAccounts();
  //   }

  async find(params) {
    return await this.web3.eth.getAccounts();
  }

  async get(id, params) {
    return await this.web3.eth.getBalance(id);
  }

  async create(data, params) {}

  async update(id, data, params) {}

  async patch(id, data, params) {
    this.web3.eth.subscribe(
      "logs",
      {
        address: id
      },
      function(error, result) {
        if (!error) console.log(result);
        else console.log(error);
      }
    );
  }
  async remove(id, params) {}
}
module.exports = function(app) {
  app.use("web3Service", new Web3Service());
};
