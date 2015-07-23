var pubnub = require('pubnub')({
  ssl: true,
  subscribe_key: "sub-c-0b07ea0e-2f48-11e5-b3fa-02ee2ddab7fe",
  publish_key: "pub-c-a865e2c2-3971-4feb-9bfd-d079f49b2e54"
})

var keypress = require('keypress')

keypress(process.stdin)

process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause()
    process.exit(0)
  }
  // wasd fik up down left right q m
  var myCommand = 'm'
  pubnub.publish({
    channel: 'commands',
    message: { action: myCommand}
  })
})

process.stdin.setRawMode(true)
process.stdin.resume()