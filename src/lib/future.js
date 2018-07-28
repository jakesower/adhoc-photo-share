module.exports = function createFuture() {
  let listeners = [];
  let complete = false;
  let value = null;

  function map(fn) {
    if (complete) fn(value);
    else listeners.push(fn);
  }

}
