const domready = require('domready')
const gameloop = require('gameloop')
const PIXI = require('pixi.js')
const _ = require('lodash')

class Person extends PIXI.Container {
  constructor (props = {}) {
    super()
    this.graphics = new PIXI.Graphics()
    this.addChild(this.graphics)

    this.props = _.defaults(props, {
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      rotationSpeed: 20,
      xMovement: 0,
      yMovement: 0,
      color: 0xFF0000
    })

    this.applyProps()
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
    this.x += (dt * this.props.xMovement)
    this.y += (dt * this.props.yMovement)

    this.rotation += (this.props.rotationSpeed * dt)
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
  let renderer = PIXI.autoDetectRenderer(800, 600)

  document
    .querySelector('body')
    .appendChild(renderer.view)

  let p1 = new Person({
    x: 20,
    y: 20,
    rotationSpeed: 20,
    xMovement: 30,
    color: 0xFFFFFF
  })

  let p2 = new Person({
    x: 200,
    y: 200,
    rotationSpeed: 40,
    yMovement: 20,
    xMovement: 40,
    width: 60
  })

  stage.addChild(p1)
  stage.addChild(p2)

  let game = gameloop({ renderer: renderer })

  game.on('update', (dt) => {
    p1.update(dt)
    p2.update(dt)

    // Moving the stage
    stage.position.x -= (dt * 10)
  })

  game.on('draw', (renderer) => {
    p1.draw()
    p2.draw()

    renderer.render(stage)
  })

  game.start()
})
