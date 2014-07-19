var fs = require('fs');
var _ = require('lodash');

// In the interest of reusability, these options are the same as in node-linux
// https://github.com/coreybutler/node-linux/blob/ef307b/lib/systemv.js#L99-L152
// can we use node-linux? I assume it does lots of things we don't want?

var DEFAULTS = {
  label: 'node-app',
  servicesummary: 'node-app',
  servicedescription: 'A node app',
  author: require('./package.json').author,
  script: __filename,
  user: 'nobody',
  group: 'nobody',
  pidroot: '/var/run',
  logroot: '/var/log',
  created: new Date(),
  execpath: process.execPath,
  cwd: '/',
  env: {},
  template: require.resolve('./upstart.conf.jst')
}

module.exports = renderUpstartJob;

function renderUpstartJob(opts, cb) {
  if (typeof cb === 'function') {
    return asyncRenderUpstart(opts, cb);
  } else {
    return syncRenderUpstart(opts);
  }
}

// you need both ways?
function syncRenderUpstart(opts) {
  opts = ensureOptions(opts); // can be done at start of renderUpstartJobs?
  var jst = fs.readFileSync(opts.template, 'utf8');
  return _.template(jst, opts);
}

function asyncRenderUpstart(opts, cb) {
  opts = ensureOptions(opts); // ditto
  fs.readFile(opts.template, 'utf8', function(err, jst) {
    var job = err ? null : _.template(jst, opts);
    return cb(err, job);
  });
}

function ensureOptions(input) {
  var opts = handleOptionAliases(input);
  opts = _.extend({}, DEFAULTS, opts);
  opts = flattenOptions(opts);
  return opts;
}

function handleOptionAliases(input) {
  var opts = _.extend({}, input);
  if (opts.name) {
    opts.label = opts.servicesummary = opts.name;
  }
  if (opts.user && !opts.group) {
    opts.group = opts.user;
  }
  if (opts.description) {
    opts.servicedescription = opts.description;
  }
  return opts;
}

function flattenOptions(opts) {
  opts = _.cloneDeep(opts);
  // env rendering assumgs an array of k/v pairs: [[k1,v1],[k2,v2],...]
  if (!Array.isArray(opts.env)) {
    opts.env = _.pairs(opts.env);
  }
  if (opts.created instanceof Date) {
    opts.created = opts.created.toJSON();
  }
  return opts;
}

if (require.main === module) {
  var opts = require('minimist')(process.argv.slice(2));
  if (opts.help) {
    console.log('Usage: %s [options]\n', process.title);
    console.log('Options (and defaults)');
    var max = _.max(Object.keys(DEFAULTS), 'length');
    var pad = max.replace(/./g, ' ');
    _.forEach(DEFAULTS, function(def, opt) {
      opt = opt + pad;
      console.log('    --%s    %s',
                  opt.slice(0, max.length),
                  def);
    });
  } else {
    process.stdout.write(renderUpstartJob(opts));// could just be async
  }
}
