import React, { forwardRef } from 'react'
import useDraggable from './useDraggable'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setActive } from '../../redux/slices/active.slice'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
const DraggableButton = () => {
  const dispatch = useAppDispatch()

  const active = useAppSelector((state) => state.active.isActive)

  return (
    <DropdownMenu.Root open={active} onOpenChange={(open) => dispatch(setActive(open))}>
      {/* <DropdownMenu.Root open={active} onOpenChange={(open) => dispatch(setActive(open))}> */}
      <DropdownMenu.Trigger asChild>
        <Button />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            New Tab{' '}
            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘+T
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            New Window{' '}
            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘+N
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            disabled
          >
            New Private Window{' '}
            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⇧+⌘+N
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const Button = forwardRef((props, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const active = useAppSelector((state) => state.active.isActive)

  const { buttonRef, position, handleMouseDown } = useDraggable(ref)
  return (
    <button
      {...props}
      // onDoubleClick={(e) => {
      //   dispatch(setActive(!active))
      // }}
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
  )
})

export default DraggableButton
