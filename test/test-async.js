var assert = require('assert');
var common = require('./common');
var render = require('../');

var expected = common.fixture('simple.conf');
var options = {
  name: 'strong-pm',
  description: 'Node application server',
  execpath: '/custom/path/to/node',
  script: '/custom/path/to/my/script.js',
  created: '2014-08-22T00:00:00.000Z',
};
var result = null;

process.on('exit', function() {
  assert.strictEqual(result, expected);
});

render(options, function(err, job) {
  assert.ifError(err);
  result = job;
});
