import React from 'react'
import useDraggable from './useDraggable'

const DraggableButton = () => {
  const { buttonRef, position, handleMouseDown } = useDraggable()

  return (
    <button
      ref={buttonRef}
      id="draggable-button"
      style={{
        position: 'fixed',
        left: `${position.current.x}px`,
        top: `${position.current.y}px`,
        zIndex: 1000,
        borderRadius: '100%',
        backgroundColor: '#3b82f6',
        color: 'white',
        width: '60px',
        height: '60px',
        borderColor: 'transparent',
        cursor: 'grab',
      }}
      onMouseDown={handleMouseDown}
    />
  )
}

export default DraggableButton
