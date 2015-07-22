var fetchConfig = require('zero-config')
 
var config = fetchConfig(__dirname, {
    dcValue: 'default'
})
 
var pubnub = require('pubnub')({
  ssl: true,
  publish_key: config.get("pubnub.publish_key"),
  subscribe_key: config.get("pubnub.subscribe_key")
})

module.exports = function (action) {

  pubnub.publish({
    channel: 'commands', 
    message: { action: action }
  })

}

