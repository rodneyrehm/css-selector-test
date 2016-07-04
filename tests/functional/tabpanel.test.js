define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var createTestsFromCss = require('../helper/create-tests-from-css');

  bdd.describe('tabpanel', function() {
    var timeout = 120000;

    bdd.before(function() {
      return this.remote
        .setPageLoadTimeout(timeout)
        .setFindTimeout(timeout)
        .setExecuteAsyncTimeout(timeout)
        .get(require.toUrl('tests/pages/tabpanel.test.html'));
    });

    bdd.describe('initial HTML fragment', function() {
      createTestsFromCss(bdd, 'tests/pages/tabpanel.test.css');
    });

    // bdd.it('should skip disabled elements', function() {
    //   this.timeout = timeout;
    // 
    //   return this.remote
    // 
    // });


  });
});
