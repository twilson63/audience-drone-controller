var keypress = require('keypress')
var emit = require('./publish')

keypress(process.stdin)

process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause()
    process.exit(0)
  }
  // wasd fik up down left right q m
  var myCommand = 'm'
  emit(myCommand)
})

process.stdin.setRawMode(true)
process.stdin.resume()