// Get references to the DOM elements we need to manipulate:
let rocket = document.getElementById('rocket')
let heightDisplay = document.getElementById('height')
let speedDisplay = document.getElementById('speed')
let attitudeDisplay = document.getElementById('attitude')
let retroButton = document.getElementById('retro')
let leftButton = document.getElementById('thrustLeft')
let rightButton = document.getElementById('thrustRight')

// Set up initial state of rocket ship:
let pos = { x: 0, y: window.innerHeight - 44 }
let attitude = Math.PI / 2
let retro = false
let thruster = 0
let speed = { x: 30, y: 0 }

// Create a variable to record animation time:
let lastTime

// Attach event listeners:
retroButton.addEventListener('pointerdown', startBurn)
retroButton.addEventListener('pointerleave', endBurn)
retroButton.addEventListener('pointerup', endBurn)
leftButton.addEventListener('pointerdown', () => startThrust(-1))
leftButton.addEventListener('pointerup', endThrust)
leftButton.addEventListener('pointerleave', endThrust)
rightButton.addEventListener('pointerdown', () => startThrust(1))
rightButton.addEventListener('pointerup', endThrust)
rightButton.addEventListener('pointerleave', endThrust)

function startBurn() {
  retro = true
  retroButton.innerText = 'Active'
}
function endBurn() {
  retro = false
  retroButton.innerText = 'Inactive'
}
function startThrust(n) {
  thruster = n
}
function endThrust() {
  thruster = 0
}

// Here's where we move the rocket ... This function is called on every
// animation frame:
function moveRocket(time) {
  if (lastTime) {
    // Calculate delta time, in seconds, since last frame
    let deltaT = (time - lastTime) / 1000

    // If thruster active, adjust rocket attitude
    if (thruster) {
      attitude += thruster * deltaT
      rocket.style.transform = `rotate(${attitude}rad)`
      attitudeDisplay.innerText =
        ((attitude * 180) / Math.PI).toFixed(0) + ' deg'
    }

    // Calculate acceleration by adding retro thrust to Moon gravity
    let acceleration = { x: 0, y: -1.625 }
    if (retro) {
      acceleration.x -= 10 * Math.cos(attitude + Math.PI / 2)
      acceleration.y += 10 * Math.sin(attitude + Math.PI / 2)
    }

    // Now calculate the rocket's new position and speed
    pos.x += speed.x * deltaT + 0.5 * acceleration.x * deltaT ** 2
    pos.y += speed.y * deltaT + 0.5 * acceleration.y * deltaT ** 2
    speed.x += acceleration.x * deltaT
    speed.y += acceleration.y * deltaT

    // Combine X and Y speed to get net speed
    const netSpeed = Math.sqrt(speed.x ** 2 + speed.y ** 2)

    // Update elements
    rocket.style.left = pos.x + 'px'
    rocket.style.bottom = Math.max(pos.y, 0) + 'px'
    heightDisplay.innerText = pos.y.toFixed(4)
    speedDisplay.innerText = netSpeed.toFixed(2)

    // If the rocket strays outside the window then stop animation with
    // an alert message
    if (pos.x < 0 || pos.x > window.innerWidth || pos.y > window.innerHeight) {
      window.alert('Lost contact with lander')
      return
    }

    // Otherwise check if we've reached the Moon surface
    else if (pos.y <= 0) {
      if (netSpeed > 10) window.alert('Oops! Travelling too fast!')
      else {
        if (Math.abs((attitude * 180) / Math.PI) > 15) {
          window.alert('Rocket fell over!')
        } else {
          rocket.style.transform = 'rotate(0deg)'
          window.alert('Perfect landing')
        }
      }
      return
    }
  }

  // Note the timestamp of this animation frame, and request another
  lastTime = time
  window.requestAnimationFrame(moveRocket)
}

// Start the animation
window.requestAnimationFrame(moveRocket)
