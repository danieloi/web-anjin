import { useEffect, useRef } from 'react'

const useDraggable = () => {
  const isDragging = useRef(false)
  const position = useRef({ x: 20, y: 20 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastPosition = useRef({ x: 0, y: 0 })
  const offset = useRef({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    isDragging.current = true
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.cursor = 'grab'
    lastPosition.current = {
      x: e.pageX,
      y: e.pageY,
    }
    offset.current = {
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return

    const deltaX = e.pageX - lastPosition.current.x
    const deltaY = e.pageY - lastPosition.current.y

    position.current = {
      x: e.pageX - offset.current.x,
      y: e.pageY - offset.current.y,
    }
    velocity.current = { x: deltaX, y: deltaY }
    lastPosition.current = { x: e.pageX, y: e.pageY }

    if (buttonRef.current) {
      buttonRef.current.style.left = `${position.current.x}px`
      buttonRef.current.style.top = `${position.current.y}px`
    }
  }

  const handleMouseUp = (e: MouseEvent) => {
    isDragging.current = false

    if (buttonRef.current) {
      buttonRef.current.style.cursor = 'default'
      animateButton()
    }
  }

  const animateButton = () => {
    const friction = 0.95
    const bounceFactor = 0.5
    const move = () => {
      if (!isDragging.current && buttonRef.current) {
        velocity.current.x *= friction
        velocity.current.y *= friction

        position.current.x += velocity.current.x
        position.current.y += velocity.current.y

        // Boundary checks
        if (position.current.x < 0) {
          position.current.x = 0
          velocity.current.x *= -bounceFactor
        } else if (position.current.x + buttonRef.current.offsetWidth > window.innerWidth) {
          position.current.x = window.innerWidth - buttonRef.current.offsetWidth
          velocity.current.x *= -bounceFactor
        }

        if (position.current.y < 0) {
          position.current.y = 0
          velocity.current.y *= -bounceFactor
        } else if (position.current.y + buttonRef.current.offsetHeight > window.innerHeight) {
          position.current.y = window.innerHeight - buttonRef.current.offsetHeight
          velocity.current.y *= -bounceFactor
        }

        buttonRef.current.style.left = `${position.current.x}px`
        buttonRef.current.style.top = `${position.current.y}px`

        if (Math.abs(velocity.current.x) > 0.5 || Math.abs(velocity.current.y) > 0.5) {
          requestAnimationFrame(move)
        }
      }
    }
    requestAnimationFrame(move)
  }

  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e)
    const handleMouseUpWrapper = (e: MouseEvent) => handleMouseUp(e)

    document.addEventListener('mousemove', handleMouseMoveWrapper)
    document.addEventListener('mouseup', handleMouseUpWrapper)

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWrapper)
      document.removeEventListener('mouseup', handleMouseUpWrapper)
    }
  }, [])

  return {
    buttonRef,
    position,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}

export default useDraggable
