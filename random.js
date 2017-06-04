function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomChar() {
  var c = Math.floor(getRandomInt(63, 122))

  if (c === 63) {
    c = 32
  }
  if (c === 64) {
    c = 46
  }
  return String.fromCharCode(c);
}

function sum (xs) {
  return xs.reduce(function (acc, s) {
    return acc += s
  }, 0)
}

function pickOne (array, scores)  {
  var s = sum(scores)
  var r = getRandomInt(0, s)
  var i = 0

  while (r > -1) {
    r = r - scores[i]
    i++
  }

  return array[--i]
}

module.exports = {
  getRandomInt : getRandomInt,
  getRandomChar : getRandomChar,
  pickOne : pickOne
}
