module.exports = async function (time) {
  return new Promise(resolve => {
    
    setTimeout(function () {
      resolve(null)
    }, time)
    
  })
}