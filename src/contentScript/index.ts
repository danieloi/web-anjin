console.info('contentScript is running')

const button = document.createElement('button')
button.id = 'draggable-button'
button.style.position = 'fixed'
button.style.bottom = '20px'
button.style.right = '20px'
button.style.zIndex = '1000'
button.style.borderRadius = '100%'
button.style.backgroundColor = '#3b82f6'
button.style.color = 'white'
button.style.width = '80px'
button.style.height = '80px'
button.style.borderColor = 'transparent'

let isDragging = false
let lastX,
  lastY,
  velocityX = 0,
  velocityY = 0
let offsetX, offsetY

button.addEventListener('mousedown', function (e) {
  isDragging = true
  const rect = button.getBoundingClientRect()
  offsetX = e.pageX - rect.left // Calculate the offset for X
  offsetY = e.pageY - rect.top // Calculate the offset for Y
  lastX = e.pageX
  lastY = e.pageY
})

document.addEventListener('mousemove', function (e) {
  if (isDragging) {
    let deltaX = e.pageX - lastX
    let deltaY = e.pageY - lastY
    velocityX = deltaX
    velocityY = deltaY

    // Use the offsets to adjust the button's position so there's no jump
    button.style.left = e.pageX - offsetX + 'px'
    button.style.top = e.pageY - offsetY + 'px'

    button.style.right = ''
    button.style.bottom = ''
    lastX = e.pageX
    lastY = e.pageY
  }
})

document.addEventListener('mouseup', function (e) {
  isDragging = false
  animateButton()
})

function animateButton() {
  const friction = 0.95
  const bounceFactor = 0.5
  const move = () => {
    if (!isDragging) {
      velocityX *= friction
      velocityY *= friction
      let newX = parseInt(button.style.left) + velocityX
      let newY = parseInt(button.style.top) + velocityY

      // Boundary checks
      if (newX < 0) {
        newX = 0
        velocityX *= -bounceFactor
      } else if (newX + button.offsetWidth > window.innerWidth) {
        newX = window.innerWidth - button.offsetWidth
        velocityX *= -bounceFactor
      }

      if (newY < 0) {
        newY = 0
        velocityY *= -bounceFactor
      } else if (newY + button.offsetHeight > window.innerHeight) {
        newY = window.innerHeight - button.offsetHeight
        velocityY *= -bounceFactor
      }

      button.style.left = newX + 'px'
      button.style.top = newY + 'px'

      if (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5) {
        requestAnimationFrame(move)
      }
    }
  }
  requestAnimationFrame(move)
}

document.body.appendChild(button)
