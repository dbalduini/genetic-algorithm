const random = require('./random')

function DNA (size, genes) {
  this.fitness = 0
  this.size = size

  if (genes === undefined) {
    // Create random char genes
    this.genes = new Array(size)
    for (var i = 0; i < size; i++) {
      this.genes[i] = random.getRandomChar()
    }
  } else {
    this.genes = genes
  }
}

DNA.prototype.evaluateFitness = function (target) {
  var score = 0;

  for (var i = 0; i < this.genes.length; i++) {
    if (target.charAt(i) === this.genes[i]) {
      score++
    }
  }

  this.fitness = Math.pow(score, 2)
  return this.fitness
}

// random midpoint crossover method
DNA.prototype.crossover = function (other) {
  var size = this.size
  var midpoint = random.getRandomInt(0, size)
  var genes = new Array(size)

  for (var i = 0; i < size; i++) {
    if (i < midpoint) {
      // Copy first half from this genes
      genes[i] = this.genes[i]
    } else {
      // Copy the other half of genes
      genes[i] = other.genes[i]
    }
  }

  return new DNA(size, genes)
}

DNA.prototype.mutate = function (rate) {
  for (var i = 0; i < this.size; i++) {
    // Random decimal between 0~1
    if (Math.random(0, 1) < rate) {
      this.genes[i] = random.getRandomChar()
    }
  }
}

module.exports = DNA
