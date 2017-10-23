const domready = require('domready')
const gameloop = require('gameloop')
const PIXI = require('pixi.js')
const _ = require('lodash')
const p2 = require('p2')

let world = new p2.World({
  gravity: [0, 0]
})

world
  .defaultContactMaterial
  .friction = 0

class Person extends PIXI.Container {
  constructor (props = {}) {
    super()

    this.props = _.defaults(props, {
      x: 0,
      y: 0,
      mass: 10,
      width: 40,
      height: 40,
      rotationSpeed: 20,
      angularDamping: 0.1,
      fixedRotation: false,
      color: 0xFF0000
    })

    this.applyProps()
    this.addGraphics()
  }

  addGraphics () {
    this.graphics = new PIXI.Graphics()
    this.addChild(this.graphics)
  }

  attachBody (world) {
    this.body = new p2.Body({
      mass: this.props.mass,
      damping: 0,
      angularVelocity: this.props.rotationSpeed,
      angularDamping: this.props.angularDamping,
      position: [
        this.props.x,
        this.props.y
      ]
    })

    this.shape = new p2.Box({
      width: this.props.width,
      height: this.props.height,
      position: [
        this.props.width * 0.5,
        this.props.height * 0.5
      ]
    })

    this.body.addShape(this.shape)
    world.addBody(this.body)
  }

  applyProps () {
    this.x = this.props.x
    this.y = this.props.y

    this.width = this.props.width
    this.height = this.props.height

    this.pivot.x = (this.props.width * 0.5)
    this.pivot.y = (this.props.height * 0.5)
  }

  update (dt) {
    this.x = this.body.interpolatedPosition[0]
    this.y = this.body.interpolatedPosition[1]
    this.rotation = this.body.angle
  }

  draw () {
    this.graphics.clear()
    this.graphics.beginFill(this.props.color)
    this.graphics.drawRect(
      0, 0,
      this.props.width,
      this.props.height
    )
    this.graphics.endFill()
  }
}

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
      mass: 2,
      rotationSpeed: 20,
      color: 0xFFFFFF
    }),
    new Person({
      x: 200,
      y: 200,
      rotationSpeed: 540,
      angularDamping: 0,
      width: 60
    }),
    new Person({
      x: 400,
      y: 400,
      rotationSpeed: 20,
      color: 0xFF00FF
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
      color: 0xFFFF00
    }),
    new Person({
      x: 600,
      y: 100,
      rotationSpeed: 50,
      color: 0xFFFFFF
    }),
    new Person({
      x: 400,
      y: 300,
      rotationSpeed: 50,
      color: 0x0000FF
    }),
    new Person({
      x: 700,
      y: 320,
      mass: 5,
      rotationSpeed: 50,
      color: 0x0000FF
    })
  ]

  _.each(people, (person) => {
    person.attachBody(world)
    stage.addChild(person)
  })

  people[0].body.applyImpulse([1000, 1000])
  people[5].body.applyImpulse([-700, 1000])
  // people[4].body.applyImpulse([-500, 0])

  let game = gameloop({ renderer: renderer })

  game.on('update', (dt) => {
    world.step(1.0 / 60.0, dt)

    _.each(people, (person) => {
      person.update(dt)
    })
  })

  game.on('draw', (renderer) => {
    _.each(people, (person) => {
      person.draw()
    })

    renderer.render(stage)
  })

  game.start()
})
