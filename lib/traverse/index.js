'use strict';

var fs = require('fs');
var path = require('path');

var decide = function decide(fullpath, collection) {
  if (fs.lstatSync(fullpath).isDirectory()) {
    return traverse(fullpath, collection);
  }
  return collection.push(fullpath);
};

var traverse = function traverse(dir) {
  var collection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!fs.existsSync(dir)) return [];
  fs.readdirSync(dir).forEach(function (file) {
    return decide(path.join(dir, file), collection);
  });
  return collection;
};

module.exports = traverse;