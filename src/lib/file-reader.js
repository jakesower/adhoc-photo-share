module.exports = {
  readOne,
  readAll
}


function readOne(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      console.log(reader.result)
      resolve(reader.result);
    }
    reader.onerror = reject;
  })
}

function readAll(files) {
  console.log(files)
  return Promise.all(files.map(readOne));
}
