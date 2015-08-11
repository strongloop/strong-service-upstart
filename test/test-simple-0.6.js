var common = require('./common');
var render = require('../');
var tap = require('tap');

var options = {
  name: 'strong-pm',
  author: 'Current User',
  description: 'Node application server',
  execpath: '/custom/path/to/node',
  script: '/custom/path/to/my/script.js',
  created: '2014-08-22T00:00:00.000Z',
  version: '0.6',
};

var expected = common.fixture('strong-pm-0.6.conf');

tap.test('sync mode', function(t) {
  var result = render(options);
  t.strictEqual(result, expected);
  t.end();
});
