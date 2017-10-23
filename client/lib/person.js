const _ = require('lodash')
const PersonBodyBuilder = require('./bodies/person')
const PersonView = require('./views/person')

let defaults = {
  x: 0,
  y: 0,
  mass: 10,
  width: 40,
  height: 40,
  damping: 0,
  rotationSpeed: 0,
  angularDamping: 0.1,
  fixedRotation: false,
  color: 0xFF0000
}

class Person {
  constructor (props = {}) {
    this.props = _.defaults(props, defaults)

    this.view = new PersonView(this.props)
    this.view.x = this.props.x
    this.view.y = this.props.y

    this.body = PersonBodyBuilder(this.props)
    this.draw = _.bind(this.view.draw, this.view)
  }

  update (dt) {
    this.view.x = this.body.interpolatedPosition[0]
    this.view.y = this.body.interpolatedPosition[1]
    this.view.rotation = this.body.angle
  }
}

module.exports = Person
