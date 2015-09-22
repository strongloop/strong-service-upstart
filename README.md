# strong-service-upstart

Generate an Upstart job using the provided parameters.


## Install

`npm install strong-service-upstart`

## Basic Usage

```js
var fs = require('fs');
var upstart = require('strong-service-upstart');

// Generate Upstart job for my-app
upstart({name: 'my-app'}, function(err, job) {
  fs.writeFile('/etc/init/my-app.conf', job, function(err) {
    if (err) console.error(err);
  });
});

// Also supports synchronous mode
fs.writeFileSync('/etc/init/my-app.conf', upstart({name: 'my-app'}));
```

## Options

This module supports a subset of those used in the node-linux templates:

 * `name` - name of service. In comments in v1.4 and syslog tagging in v0.6.
   `name` is an alias for `label` and `servicesummary`.
 * `description` - multi-word description of service. `description` is an
   alias for `servicedescription`.
 * `author` - sets author field of Upstart job (defaults to current user)
 * `cwd` - working directory to run service from (defaults to `/`)
 * `user` - user to run service as (defaults to `nodbody`)
 * `group` - group to run service as (Upstart v1.4 only, defaults to `nogroup`)
 * `execpath` - path to binary to executable
 * `script` - arguments to execpath (such as a script)
 * `created` - timestamp used in generated job (defaults to current time)
 * `env` - environment variables to set in Upstart job
 * `version` - Upstart version to target: `0.6`, `1.4`(default)
 * `template` - override internal template

## Upstart Versions

Upstart v1.4 added support for setuid and setgid, so the default template
requires Upstart v1.4.

A job file compatible with older versions of Upstart can be generated by
specifying `version: '0.6'` in the options (or by providing your own template).

## Template Format

Templates use [_.template](http://lodash.com/docs#template) from Lodash using
EJS style syntax: `<%= option %>`.
