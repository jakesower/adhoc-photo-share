var fs = require('fs');
var dom = require('./src/dom');
var mainTemplate = fs.readFileSync(__dirname + '/src/main.html');

window.adhoc = window.adhoc || {};
window.adhoc.widget = function( connection, rootElement ) {
  var state = [];

  connection.onmessage = function( message, { binary }) {
    if( binary ) {
      state.push( message );
      dom.append( message );
    }
    else if( message.type === 'state' ) {
      connection.send({ type: state, data: state });
    }
    else {
      console.log( 'Unrecognized message: ' + message );
    }
  }


  function sendState() {
    state.forEach( function( pic ) {
      connection.send( pic, { binary: 'blob' });
    });
  }


  rootElement.innerHTML = mainTemplate;
  dom.init( connection );
}
