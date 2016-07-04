define([
  // 'intern',
], function(/*intern*/) {
  // see extending config example at
  // https://github.com/mozilla/fxa-content-server/blob/master/tests/intern.js
  // if we ever need to deal with arguments
  // var args = intern.args;

  return {
    // The port on which the instrumenting proxy will listen
    proxyPort: 9000,

    // A fully qualified URL to the Intern proxy
    proxyUrl: 'http://localhost:9000/',

    // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
    // specified browser environments in the `environments` array below as well. See
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
    // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
    // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
    // automatically
    capabilities: {
      // Firefox Dev on SauceLabs does not like the version
      // 'selenium-version': '2.41.0',
    },

    loaderOptions: {
      // Packages that should be registered with the loader in each testing environment
      packages: [
        { name: 'cssom', location: 'node_modules/cssom/lib', main: 'index.js' },
      ],
    },

    // https://theintern.github.io/intern/#option-reporters
    reporters: [
      'Runner',
      // see https://theintern.github.io/intern/#reporter-lcov
      {
        id: 'LcovHtml',
        directory: 'coverage/',
        watermarks: {
          statements: [ 50, 80 ],
          lines: [ 50, 80 ],
          functions: [ 50, 80 ],
          branches: [ 50, 80 ],
        },
      },
    ],

    // Non-functional test suite(s) to run in each browser
    suites: [
      'tests/unit/*.test',
    ],

    // Functional test suite(s) to run in each browser once non-functional tests are completed
    functionalSuites: [
      'tests/functional/*.test',
    ],
    // functionalSuites: [
    //   'tests/functional/hello-world.test.js',
    // ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:tests|bower_components|node_modules)\//,
  };
});
