#!/usr/bin/env node

/*eslint-env node */

var resolve = require('path').resolve;
var spawn = require('child_process').spawn;
var phantomPath = require('phantomjs2').path;

function startPhantom(callback) {
  var args = [
    '--webdriver', '127.0.0.1:4444',
    '--ignore-ssl-errors=true',
  ];

  var process = spawn(phantomPath, args);
  var processOut = function(data) {
    var _data = String(data);
    if (_data.indexOf('GhostDriver - Main - running') !== -1) {
      process.stdout.removeListener('data', processOut);
      process.stderr.removeListener('data', console.error);
      callback && callback(process);
      return;
    }
  };

  process.stdout.on('data', processOut);
  process.stderr.on('data', console.error);

  process.on('close', function(code) {
    console.log('phantomjs exited with code ' + code);
  });

  return process;
}

function startIntern() {
  var command = resolve(__dirname, '../../node_modules/.bin/intern-runner');
  var args = [
    'config=tests/browser/phantom'
  ];

  var process = spawn(command, args, { stdio: 'inherit' });
  process.on('close', function(code) {
    console.log('intern exited with code ' + code);
  });
  return process;
}


startPhantom(function(_phantom) {
  var status;
  var _intern = startIntern();

  _phantom.on('close', function(code) {
    if (status === undefined) {
      status = code;
    }

    _intern && _intern.kill('SIGTERM');
    process.exit(status);

  });

  _intern.on('close', function(code) {
    if (status === undefined) {
      status = code;
    }

    _phantom && _phantom.kill('SIGTERM');
    process.exit(status);
  });
});
