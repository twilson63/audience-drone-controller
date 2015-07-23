var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')

var config = require('./config/common.json')

var pubnub = PUBNUB.init(config.pubnub)

var state = {
  title: 'down'
}

var tree = render(state)
var rootNode = createElement(tree)
document.body.appendChild(rootNode)

function render (state) {
  var command = state.title.length <= 1 ? state.title : h('i.material-icons',
    { style: { fontSize: '4em'}},
    'keyboard_arrow_' + state.title
  )
  return h('h1', { style: { textAlign: 'center' }}, [
    command
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
    console.log(e.action)
    state.title = e.action
    repaint(state)
  }
})
