var fs = require('fs');
var traverse = require('./traverse');
var write = require('./write');

var testLine = function testLine(pathname, lines, dir, subdir) {
  return function (line, index) {
    var hasStyle = line.match("./style.sass");
    if (!hasStyle || line.match("//")) return false;
    write(pathname, index, lines, dir, subdir);
  };
};

var testFile = function testFile(dir, subdir) {
  return function (pathname) {
    fs.readFile(pathname, { encoding: 'utf-8' }, function (err, data) {
      if (err) throw Error(err);

      var lines = data.split(/\n/);
      lines.map(testLine(pathname, lines, dir, subdir));
    });
  };
};

var read = function read(dir, subdir) {
  var files = traverse(dir + '/' + subdir);
  files.map(testFile(dir, subdir));
};

console.log('..Converting SASS the dirty way');
read(process.env.PWD, 'lib');
read(process.env.PWD, 'es');
console.log('Converted SASS the dirty way');