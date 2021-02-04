const fs = require('fs')
var traverse = require('./traverse')
var write = require('./write')

const testLine = (pathname, lines, dir, subdir) => (line, index) => {
  const hasStyle = line.match("./style.sass")
  if (!hasStyle || line.match("//")) return false
  write(pathname, index, lines, dir, subdir)
}

const testFile = (dir, subdir) => (pathname) => {
  fs.readFile(pathname, {encoding: 'utf-8'}, function(err, data){
    if (err) throw Error(err)

    const lines = data.split(/\n/)
    lines.map(testLine(pathname, lines, dir, subdir))
  });
}

const read = (dir, subdir) => {
  const files = traverse(`${dir}/${subdir}`)
  files.map(testFile(dir, subdir))
}

console.log('..Converting SASS the dirty way')
read(process.env.PWD, `lib`)
read(process.env.PWD, `es`)
console.log('Converted SASS the dirty way')
