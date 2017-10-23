const PIXI = require('pixi.js')

class Person extends PIXI.Container {
  constructor (props = {}) {
    super()

    this.props = props
    this.graphics = new PIXI.Graphics()
    this.addChild(this.graphics)
  }

  draw () {
    this.graphics.beginFill(this.props.color)
    this.graphics.drawRect(
      -this.props.width * 0.5,
      -this.props.height * 0.5,
      this.props.width,
      this.props.height
    )
    this.graphics.endFill()
  }
}

module.exports = Person
