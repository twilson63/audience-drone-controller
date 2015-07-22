var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')

var config = require('./config/common.json')

var pubnub = PUBNUB.init(config.pubnub)

var state = {
  title: 'up'
}

var tree = render(state)
var rootNode = createElement(tree)
document.body.appendChild(rootNode)

function render (state) {
  return h('h1', { style: { textAlign: 'center' }}, [
    h('i.material-icons', 
      { style: { fontSize: '4em'}}, 
      'keyboard_arrow_' + state.title
    )
  ])
}

function repaint (state) {
  // repaint
  var newTree = render(state);
  var patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;  
}

pubnub.subscribe({
  channel: 'commands',
  callback: function (e) {
    state.title = e.action
    repaint(state)  
  }
})


