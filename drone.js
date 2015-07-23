var Drone = require("rolling-spider")
var commands = require('./subscribe')

var d = new Drone()
var STEPS = 2
var ACTIVE = false


function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS * 12);
}
// NEW CODE BELOW HERE

d.connect(function() {
  d.setup(function() {
    console.log('Configured for Rolling Spider! ', d.name);
    d.flatTrim();
    d.startPing();
    d.flatTrim();

    setTimeout(function () {
      console.log('ready for flight');
      ACTIVE = true;
    }, 1000);

  });
});

commands(function (c) {
  if (ACTIVE && c) {
  if (c.action === 'm') {
    d.emergency();
    setTimeout(function () {
      process.exit();
    }, 3000);
  } else if (c.action === 't') {
    console.log('takeoff');
    d.takeOff();
  } else if (c.action === 'w') {
    d.forward({ steps: STEPS });
    cooldown();
  } else if (c.action === 's') {
    d.backward({ steps: STEPS });
    cooldown();
  } else if (c.action === 'left') {
    d.turnLeft({ steps: STEPS });
    cooldown();
  } else if (c.action === 'a') {
    d.tiltLeft({ steps: STEPS });
    cooldown();
  } else if (c.action === 'd') {
    d.tiltRight({ steps: STEPS });
    cooldown();
  } else if (c.action === 'right') {
    d.turnRight({ steps: STEPS });
    cooldown();
  } else if (c.action === 'up') {
    d.up({ steps: STEPS * 2.5 });
    cooldown();
  } else if (c.action === 'down') {
    d.down({ steps: STEPS * 2.5 });
    cooldown();
  } else if (c.action === 'i' || c === 'f') {
    d.frontFlip({ steps: STEPS });
    cooldown();
  // } else if (key.name === 'j') {
  //   d.leftFlip({ steps: STEPS });
  //   cooldown();
  // } else if (key.name === 'l') {
  //   d.rightFlip({ steps: STEPS });
  //   cooldown();
  } else if (c.action === 'k') {
    d.backFlip({ steps: STEPS });
    cooldown();
  } else if (c.action === 'q') {
    console.log('Initiated Landing Sequence...');
    d.land();
  }
}
})
