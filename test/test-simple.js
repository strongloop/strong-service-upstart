// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: strong-service-upstart
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

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
};

var expected = common.fixture('strong-pm-1.4.conf');

tap.test('sync mode', function(t) {
  var result = render(options);
  t.strictEqual(result, expected);
  t.end();
});
