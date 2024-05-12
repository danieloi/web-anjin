import React from 'react'
import useDraggable from './useDraggable'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setActive } from '../../redux/slices/active.slice'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

const ORB_DIMENSIONS = 60
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
        className={`${active ? 'bg-blue-300' : 'bg-blue-400'} shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-blue-300 `}
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
      <Dialog.Root>
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
              className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <DropdownMenu.Item
                onSelect={() => {
                  const allTextContent = document.body.innerText
                  console.log(
                    'All text content from the main website:',
                    JSON.stringify(allTextContent),
                  )
                }}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              >
                Smarter Page Search
              </DropdownMenu.Item>
              <Dialog.Trigger asChild>
                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  Point and Ask Mode
                </DropdownMenu.Item>
              </Dialog.Trigger>
              <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Settings
              </DropdownMenu.Item>
              <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Hide Assistant
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium"></Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default DraggableButton
