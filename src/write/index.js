const fs = require('fs')
var sass = require('node-sass')

const find = (file, dir, subdir) => {
  const pieces = file.split('/')
  pieces.splice(-1, 1, 'style.sass')
  return pieces.join('/').replace(`${dir}/${subdir}`, `${dir}/src`)
}

const write = (file, index, newLines, dir, subdir) => {
  const cssFile = find(file, dir, subdir)

  sass.render({ file: cssFile }, function(err, result) {
    let css = result.css.toString()
    css = css.split(/\n/).map((x) => ` "${x}" `).join("+")
    newLines[index] = `
document.body.innerHtml += "<style>" + ${css} + "</style>";
    `
    fs.writeFileSync(file, newLines.join("\n"));
  });
}

module.exports = write
