define(function(require) {
  var CSSOM = require('intern/dojo/node!cssom');
  var fs = require('intern/dojo/node!fs');
  var path = require('intern/dojo/node!path');

  var expect = require('intern/chai!expect');

  function selectHtml(selector) {
    function elementToHtmlTag(element) {
      var attributes = [].map.call(element.attributes, function(attribute) {
        return attribute.name + '="' + attribute.value + '"';
      }).join(' ');

      return '<'
        + element.nodeName.toLowerCase()
        + (attributes ? (' ' + attributes) : '')
        + '>';
    }

    var elements = document.querySelectorAll(selector) || [];
    return [].map.call(elements, elementToHtmlTag);
  }

  function generateSelectorTest(bdd, selector, message) {
    // create a test in your test environment (whatever the API for adding tests is)
    bdd.it('should not find ' + selector, function() {
      this.timeout = 120000;

      return this.remote
        .execute(selectHtml, [selector])
        .then(function(numberOfElements) {
          expect(numberOfElements).to.deep.equal([], message);
        });
    });
  }

  return function(bdd, cssFile) {
    var cssText = fs.readFileSync(path.resolve(process.cwd(), cssFile), {encoding: 'utf8'});
    var css = CSSOM.parse(cssText);
    css.cssRules.forEach(function(rule) {
      if (!rule.style.ERROR) {
        // selectors that don't have an error message do not qualify as testable
        return;
      }

      generateSelectorTest(bdd, rule.selectorText, rule.style.ERROR);
    });
  };
});