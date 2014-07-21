var assert = require('assert');
var common = require('./common');

var render = require('../');

var options = {
  name: 'strong-pm',
  description: 'Node application server',
  execpath: '/custom/path/to/node',
  script: '/custom/path/to/my/script.js',
  created: new Date(Date.UTC(2014, 7, 22)),
};

var expected = common.fixture('simple.conf');

var result = render(options);

assert.strictEqual(result, expected);