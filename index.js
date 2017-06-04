const random = require('./random')
const DNA = require('./dna')

const TARGET = 'to be or not be that is the question'
const POPULATION_SIZE = 200
const MAX_GENERATIONS = 2000
const MUTATION_RATE = 0.01

main();

function main () {
  var currentGeneration = 0
  // Create initial population
  var population = newPopulation(POPULATION_SIZE)

  while (currentGeneration < MAX_GENERATIONS) {
    var scores = []
    // Selection
    var totalScore = evaluateFitness(population, TARGET, scores)

    console.log('Generation:', currentGeneration, 'Total Score:', totalScore);

    var best = findBest(population)
    console.log(best)
    if (best === TARGET) {
      break
    }
    // Reproduction
    population = crossover(population, scores)

    currentGeneration++
  }

}

function newPopulation (size) {
  var population = new Array(size)
  var genesSize = TARGET.length

  for (var i = 0; i < size; i++) {
    population[i] = new DNA(genesSize)
  }

  return population
}

function evaluateFitness (population, target, scores) {
  var totalScore = 0

  population.forEach(function (dna) {
    var score = dna.evaluateFitness(target)
    scores.push(score)
    totalScore += score
  })

  return totalScore
}

function crossover (population, scores) {
  var newPopulation = []

  while (newPopulation.length < population.length) {
    var parentA = random.pickOne(population, scores)
    var parentB = random.pickOne(population, scores)
    // Mutation
    var child = parentA.crossover(parentB)
    child.mutate(MUTATION_RATE)

    newPopulation.push(child)
  }

  return newPopulation
}

function findBest (population) {
  var best = population[0]

  for (var i = 1; i < population.length; i++) {
    if (best.fitness < population[i].fitness) {
      best = population[i]
    }
  }

  return best.genes.join('')
}
