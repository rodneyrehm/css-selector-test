define([
  '../intern',
], function(config) {

  // NOTE: engaged via ./run-local.js to start the ChromeDriver

  // https://theintern.github.io/intern/#option-tunnel
  config.tunnel = 'NullTunnel';
  // https://theintern.github.io/intern/#option-environments
  config.environments = [
    { browserName: 'phantomjs' },
  ];

  return config;
});
