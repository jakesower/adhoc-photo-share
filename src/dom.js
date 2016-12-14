var fs = require('fs');
// var utils = require('./utils');

module.exports = {
  append: append,
  init: init
}

function init( connection ) {
  var preview = document.getElementById('preview');
  var uploader = document.getElementById('upload');
  var reader = new FileReader();

  reader.onloadend = function() {
    preview.src = reader.result;
    connection.send( reader.result );
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
      img = template.querySelector('img');

  img.setAttribute( 'src', message );
  list.appendChild( template );
}
