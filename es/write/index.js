var fs = require('fs');
var sass = require('node-sass');

var find = function find(file, dir, subdir) {
  var pieces = file.split('/');
  pieces.splice(-1, 1, 'style.sass');
  return pieces.join('/').replace(dir + '/' + subdir, dir + '/src');
};

var write = function write(file, index, newLines, dir, subdir) {
  var cssFile = find(file, dir, subdir);

  sass.render({ file: cssFile }, function (err, result) {
    var css = result.css.toString();
    css = css.split(/\n/).map(function (x) {
      return ' "' + x + '" ';
    }).join("+");
    newLines[index] = '\ndocument.body.innerHTML += "<style>" + ' + css + ' + "</style>";\n    ';
    fs.writeFileSync(file, newLines.join("\n"));
  });
};

module.exports = write;