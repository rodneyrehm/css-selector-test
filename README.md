# CSS Selector Tests

This is a demo repository to demonstrate how Heydon's [`tabpanel.test.css`](tests/pages/tabpanel.test.css) might be integrated into automated testing. This example is using [Intern](http://theintern.github.io/) as the test framework and [phantomjs2](https://www.npmjs.com/package/phantomjs2) to run the tests in. [cssom](https://www.npmjs.com/package/cssom) is used to parse the test.css, so it can be [turned into unit tests](tests/helper/create-tests-from-css.js).

The magic begins with [tests/functional/tabpanel.test.js](tests/functional/tabpanel.test.js), which instructs the browser to load [tests/pages/tabpanel.test.html](tests/pages/tabpanel.test.html) and convert [`tabpanel.test.css`](tests/pages/tabpanel.test.css) to tests.

[turning CSS into tests](tests/helper/create-tests-from-css.js) creates a new unit test for each CSS selector provided by cssom. [`bdd.it()`](https://theintern.github.io/intern/#interface-tdd) registers a callback (the unit test) for asynchronous execution.

The [actual test](tests/helper/create-tests-from-css.js#L8-22) executes the the selectors, but instead of returning the element references - which you'd normally do in WebDriver world, so you click on things, etc - it converts the nodes to an HTML representation, so they might be identified more easily. You *don't have* to do this, but it makes for a better output than *dude, I found an invalid element, but I'm not going to tell you which one it is*:

```
✓ phantomjs on any platform - tabpanel - initial HTML fragment - should not find .tab-interface ul:not([role="tablist"]) (0.01s)
× phantomjs on any platform - tabpanel - initial HTML fragment - should not find [role="tablist"] a:not([role="tab"]) (0.011s)
AssertionError: "<a> elements within the tablist need to each have the WAI-ARIA tab role to be counted as tabs in assistive technologies.": expected [ Array(1) ] to deeply equal []

  [
E   length: 0
A   0: "<a href=\"#panel4\" id=\"tab4\" role=\"none\" tabindex=\"-1\">",
A   length: 1
  ]
```

## Running the Test

I've spared you the pain of dealing with providing a WebDriver server and configuring Intern accordingly. [PhantomJS2](https://www.npmjs.com/package/phantomjs2) is downloaded via `npm install`, and via `npm test` [started before intern fires up](tests/browser/run-phantom.js). This is part of my usual setup, I'm sure other people will do this differently.

I've [added an error](tests/pages/tabpanel.test.html#L18) to force an error. As soon as you [engage the JS](tests/pages/tabpanel.test.html#L35-38), the error won't show up anymore, because the JS fixes things…

Anyway, `npm install` and `npm test` are at your command.

---

The thing I *really* dislike about Intern is RequireJS and dojo/loader. I have no idea if [Karma](https://karma-runner.github.io/1.0/index.html) does a better job…
