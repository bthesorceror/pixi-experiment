const p2 = require('p2')

module.exports = function (props = {}) {
  let body = new p2.Body({
    mass: props.mass,
    damping: props.damping,
    angularVelocity: props.rotationSpeed,
    angularDamping: props.angularDamping,
    position: [
      props.x,
      props.y
    ]
  })

  let shape = new p2.Box({
    width: props.width,
    height: props.height
  })

  body.addShape(shape)

  return body
}
