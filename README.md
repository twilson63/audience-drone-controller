# drone - demo

This is a demo that creates an audience drone controller, each user in the audience will be
responsible for one command of a drone and
they will run their repl.js app if any key is
pressed it will send that command to pubnub
which will then send to a fleet of drones.

## How it works?

Get a `pubnub` account or any pubsub system.

create a file called `config/common.json`, this 
file should have your pubnub keys:

``` json
{
  "pubnub": {
    "subscribe_key": "[subscribe key]",
    "publish_key": "[publish key"
  }
}
```

On the presenters computer run the web app using
wzrd.

```
npm i wzrd -g
wzrd app.js
```

On each audience's computer have them pull down 
this gist:

``` sh
curl -O https://gist.githubusercontent.com/twilson63/e460c01e3d36529436ff/raw/e1620a3e12d159b633a23deefa07a489dce9daa9/repl.js
```

Then each audience member will pick a letter or
arrow from this list:

// wasd fik up down left right q m





