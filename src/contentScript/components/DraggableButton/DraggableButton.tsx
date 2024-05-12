import React from 'react'
import useDraggable from './useDraggable'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setActive } from '../../redux/slices/active.slice'

const DraggableButton = () => {
  const { buttonRef, position, handleMouseDown } = useDraggable()
  const dispatch = useAppDispatch()

  const active = useAppSelector((state) => state.active.isActive)

  return (
    <button
      onDoubleClick={(e) => {
        dispatch(setActive(!active))
      }}
      ref={buttonRef}
      id="draggable-button"
      style={{
        position: 'fixed',
        left: `${position.current.x}px`,
        top: `${position.current.y}px`,
        zIndex: 1000,
        borderRadius: '100%',
        backgroundColor: active ? 'red' : '#3b82f6',
        color: 'white',
        width: '60px',
        height: '60px',
        borderColor: 'transparent',
      }}
      onMouseDown={handleMouseDown}
    />
  )
}

export default DraggableButton
