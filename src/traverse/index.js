const fs = require('fs')
var path = require('path')

const decide = (fullpath, collection) => {
  if (fs.lstatSync(fullpath).isDirectory()) {
    return traverse(fullpath, collection)
  }
  return collection.push(fullpath)
}

const traverse = (dir, collection=[]) => {
  if (!fs.existsSync(dir)) return []
  fs.readdirSync(dir).forEach(file => decide(path.join(dir, file), collection))
  return collection
}

module.exports = traverse
