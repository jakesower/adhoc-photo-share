var dom = require('./src/dom');
var fs = require('fs');
var mainTemplate = fs.readFileSync(__dirname + '/src/main.html');

window.adhoc = window.adhoc || {};
window.adhoc.widget = function( connection, rootElement ) {
  var state = [];
  var inProgress = {};

  connection.onmessage = function( message ) {
    console.log( message );
    data = JSON.parse( message.data );

    if( !( data.id in inProgress )) inProgress[ data.id ] = [];
    inProgress[ data.id ].push( data.chunk );

    if( data.last ) {
      // state.push( message.data );
      dom.append( inProgress[ data.id ].join('') );
      delete inProgress[ data.id ];
    }
    // else if( message.type === 'state' ) {
    //   connection.send({ type: state, data: state });
    // }
    // else {
    //   console.log( 'Unrecognized message: ' + message );
    // }
  }


  function sendState() {
    state.forEach( function( pic ) {
      connection.send( pic, { binary: 'blob' });
    });
  }


  rootElement.innerHTML = mainTemplate;
  dom.init( connection );
}
