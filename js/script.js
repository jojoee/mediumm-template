console.log('script.js');

function add(a, b) {
  return a + b;
}

function del(a, b) {
  return a - b;
}

// trick for testing with mocha (in module pattern)
// http://stackoverflow.com/questions/14205631/how-do-i-test-a-basic-javascript-file-with-mocha
if (typeof module !== 'undefined' && module.exports != null) {
  exports.add = add;
  exports.del = del;
}
