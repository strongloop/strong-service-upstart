var render = require('../');
var tap = require('tap');

var options = {
  name: 'strong-pm',
  author: 'Current User',
  description: 'Node application server',
  execpath: '/custom/path/to/node',
  script: '/custom/path/to/my/script.js',
  created: '2014-08-22T00:00:00.000Z',
  env: {
    FOO: 'foo',
    BAR: 'bar',
  },
};

var ENV_FOO = /^env FOO=foo$/m;
var ENV_BAR = /^env BAR=bar$/m;

tap.test('env vars', function(t) {
  var result = render(options);
  t.match(result, ENV_FOO);
  t.match(result, ENV_BAR);
  t.end();
});
