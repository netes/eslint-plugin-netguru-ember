var assert = require('chai').assert;
var babelEslint = require('babel-eslint');
var utils = require('./../../rules/utils/utils');

function parse(code) {
  return babelEslint.parse(code).body[0].expression;
}

describe('isIdentifier', function() {
  var node = parse('test');

  it('should check if node is identifier', function() {
    assert.ok(utils.isIdentifier(node));
  });
});

describe('isLiteral', function() {
  var node = parse('"test"');

  it('should check if node is identifier', function() {
    assert.ok(utils.isLiteral(node));
  });
});

describe('isMemberExpression', function() {
  var node = parse('test.value');

  it('should check if node is member expression', function() {
    assert.ok(utils.isMemberExpression(node));
  });
});

describe('isCallExpression', function() {
  var node = parse('test()');

  it('should check if node is call expression', function() {
    assert.ok(utils.isCallExpression(node));
  });
});

describe('isObjectExpression', function() {
  var node = parse('test = {}').right;

  it('should check if node is identifier', function() {
    assert.ok(utils.isObjectExpression(node));
  });
});

describe('isArrayExpression', function() {
  var node = parse('test = []').right;

  it('should check if node is array expression', function() {
    assert.ok(utils.isArrayExpression(node));
  });
});

describe('isFunctionExpression', function() {
  var node = parse('test = function () {}').right;

  it('should check if node is function expression', function() {
    assert.ok(utils.isFunctionExpression(node));
  });
});

describe('isNewExpression', function() {
  var node = parse('new Date()');

  it('should check if node is new expression', function() {
    assert.ok(utils.isNewExpression(node));
  });
});

describe('isCallWithFunctionExpression', function() {
  var node = parse('mysteriousFnc(function(){})');

  it('should check if node is call with function expression', function() {
    assert.ok(utils.isCallWithFunctionExpression(node));
  });
});

describe('isThisExpression', function() {
  var node = parse('this');

  it('should check if node is "this" expression', function() {
    assert.ok(utils.isThisExpression(node));
  });
});

describe('getSize', function() {
  var node = parse('some = {\nfew: "line",\nheight: "statement",\nthat: "should",\nhave: "6 lines",\n};');

  it('should check size of given expression', function() {
    assert.equal(utils.getSize(node), 6);
  });
});

describe('parseCallee', function() {
  it('should parse calleeExpression', function() {
    var node = parse('Ember.computed.or("asd", "qwe")');
    var parsedCallee = utils.parseCallee(node);
    assert.equal(parsedCallee.length, 3, 'it has 3 elements in array');
    assert.deepEqual(parsedCallee, ['Ember', 'computed', 'or']);
  });

  it('should parse newExpression', function() {
    var node = parse('new Ember.A()');
    var parsedCallee = utils.parseCallee(node);
    assert.equal(parsedCallee.length, 2, 'it has 2 elements in array');
    assert.deepEqual(parsedCallee, ['Ember', 'A']);
  });
});

describe('parseArgs', function() {
  it('should parse arguments', function() {
      var node = parse('Ember.computed("asd", "qwe", "zxc", function() {})');
      var parsedArgs = utils.parseArgs(node);
      assert.equal(parsedArgs.length, 3);
      assert.deepEqual(parsedArgs, ['asd', 'qwe', 'zxc']);
  });
});
