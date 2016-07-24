var matchers = {};

require('../testUtil/matcher/toBeInstanceOf')(matchers);

beforeEach(function () {
    jasmine.addMatchers(matchers);
});
