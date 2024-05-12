import React from 'react'
import useDraggable from './useDraggable'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setActive } from '../../redux/slices/active.slice'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
const DraggableButton = () => {
  const dispatch = useAppDispatch()

  const active = useAppSelector((state) => state.active.isActive)

  const { buttonRef, position, handleMouseDown } = useDraggable()
  return (
    <>
      <button
        onDoubleClick={(e) => {
          dispatch(setActive(!active))
        }}
        ref={buttonRef}
        id="draggable-button"
        className={active ? 'bg-red-400' : 'bg-blue-400'}
        style={{
          position: 'fixed',
          left: `${position.current.x}px`,
          top: `${position.current.y}px`,
          zIndex: 1000,
          borderRadius: '100%',
          color: 'white',
          width: '60px',
          height: '60px',
          borderColor: 'transparent',
        }}
        onMouseDown={handleMouseDown}
      />
      <DropdownMenu.Root open={active} onOpenChange={(open) => dispatch(setActive(open))}>
        <DropdownMenu.Trigger asChild>
          {/* hack to make dragging and triggers work */}
          <div
            style={{
              position: 'fixed',
              left: `${position.current.x}px`,
              top: `${position.current.y}px`,
              width: '60px',
              height: '60px',
            }}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-50 min-w-[220px] bg-white rounded-md p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="group text-[14px] leading-none text-violet-400 rounded-md flex items-center h-8 px-1 relative pl-7 select-none outline-none data-[disabled]:text-violet-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-900 data-[highlighted]:text-violet-100">
              Smarter Search
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group text-[14px] leading-none text-violet-400 rounded-md flex items-center h-8 px-1 relative pl-7 select-none outline-none data-[disabled]:text-violet-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-900 data-[highlighted]:text-violet-100">
              Point and Ask Mode
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group text-[14px] leading-none text-violet-400 rounded-md flex items-center h-8 px-1 relative pl-7 select-none outline-none data-[disabled]:text-violet-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-900 data-[highlighted]:text-violet-100">
              Hide Assistant
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}

export default DraggableButton
