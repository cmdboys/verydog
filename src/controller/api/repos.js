const BaseRest = require('../rest.js');
const model = require('../../database/controller/repositories')

module.exports = class extends BaseRest {
  async getAction(){
    let jsons = await model.getUser();
    this.ctx.success(jsons);
  }
  postAction(){
    this.ctx.success();
  }
  putAction(){
    this.ctx.success();
  }
  deleteAction(){
    this.ctx.success();
  }
};
