const writeJSON = require('../src/git/writeJSON');

let write = new writeJSON();

(async function () {

  await write.run()
  
})()
