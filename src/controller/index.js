const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    this.ctx.set('X-Powered-By', 'PHP/5.6.33-0+deb8u1')
    return this.display();
  }
};
