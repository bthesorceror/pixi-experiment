const domready = require('domready')
const gameloop = require('gameloop')
const PIXI = require('pixi.js')
const _ = require('lodash')
const p2 = require('p2')
const Person = require('./lib/person')

let world = new p2.World({ gravity: [0, 0] })

world
  .defaultContactMaterial
  .friction = 0.25

domready(() => {
  let stage = new PIXI.Container()
  let renderer = PIXI.autoDetectRenderer({
    width: 800,
    height: 600,
    antialias: true
  })

  document.querySelector('body').appendChild(renderer.view)

  let people = [
    new Person({
      x: 20,
      y: 20,
      rotationSpeed: 20,
      color: 0xFFFFFF
    }),
    new Person({
      x: 200,
      y: 200,
      damping: 0.75,
      rotationSpeed: 540,
      angularDamping: 0,
      width: 60
    }),
    new Person({
      x: 400,
      y: 400,
      damping: 0.6,
      rotationSpeed: 20,
      color: 0xFF00FF,
      height: 10
    }),
    new Person({
      x: 500,
      y: 500,
      rotationSpeed: 75,
      color: 0xFFFF00
    }),
    new Person({
      x: 200,
      y: 500,
      rotationSpeed: 50,
      mass: 2,
      color: 0xFFFF00,
      width: 90,
      height: 90
    }),
    new Person({
      x: 600,
      y: 100,
      mass: 10,
      color: 0xFFFFFF,
      height: 60
    }),
    new Person({
      x: 400,
      y: 300,
      color: 0x0000FF
    }),
    new Person({
      x: 700,
      y: 320,
      mass: 200,
      color: 0x0000FF
    })
  ]

  _.each(people, (person) => {
    world.addBody(person.body)
    stage.addChild(person.view)
  })

  people[0].body.applyImpulse([1000, 1000])
  people[5].body.applyImpulse([-700, 1000])
  people[4].body.applyImpulse([500, -500])

  let game = gameloop({ renderer: renderer })

  game.on('update', (dt) => {
    world.step(1.0 / 60.0, dt)

    _.each(people, (person) => {
      person.update(dt)
    })
  })

  game.on('draw', (renderer) => {
    renderer.clear()

    _.each(people, (person) => {
      person.draw()
    })

    renderer.render(stage)
  })

  window.addEventListener('blur', () => {
    game.pause()
  })

  window.addEventListener('focus', () => {
    game.resume()
  })

  game.start()
})
