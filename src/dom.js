config = {
  chunkSize: 1000
}

var fs = require('fs');
var sha256 = require('js-sha256');

module.exports = {
  append: append,
  init: init
}

function init( connection ) {
  var preview = document.getElementById('preview');
  var uploader = document.getElementById('upload');
  var reader = new FileReader();

  var sendInChunks = function( data ) {
    console.log( data.length )
    let cursor = 0;
    let id = sha256( data );

    while( data.length > ( config.chunkSize * ( cursor + 1 ))) {
      const startOffset = config.chunkSize * cursor;
      const endOffset = (( config.chunkSize * ( cursor + 1 )));

      connection.send( JSON.stringify({
        id: id,
        chunk: data.slice( startOffset, endOffset ),
        last: false
      }));

      cursor += 1;
    }

    connection.send( JSON.stringify({
      id: id,
      chunk: data.slice( config.chunkSize * cursor ),
      last: true
    }));
  }

  reader.onloadend = function() {
    preview.src = reader.result;
    sendInChunks( reader.result );
  }

  uploader.addEventListener('change', function() {
    var file = uploader.files[0];
    if(file) {
      reader.readAsDataURL(file);
    }
    else {
      preview.src = '';
    }
  });
}

function append( message ) {
  var list = document.getElementById('picture-list'),
      template = document.getElementById('picture-template').content,
      clone = document.importNode( template, true ),
      img = clone.querySelector('img');

  img.setAttribute( 'src', message );
  list.appendChild( clone );
}
