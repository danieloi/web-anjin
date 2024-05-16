import React from 'react'
import useDraggable from './useDraggable'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setActive, setHidden } from '../../redux/slices/assistantState.slice'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import {
  CursorArrowIcon,
  EyeClosedIcon,
  GearIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import PointAndAskDialogBody from './PointAndAskDialogBody'
import SmarterSearchDialogBody from './SmarterSearchDialogBody'

const ORB_DIMENSIONS = 60

const DraggableButton = () => {
  const dispatch = useAppDispatch()

  const active = useAppSelector((state) => state.assistant.isActive)
  const hidden = useAppSelector((state) => state.assistant.isHidden)

  const { buttonRef, position, handleMouseDown } = useDraggable()

  const [pointAndAskActive, setPointAndAskActive] = React.useState(false)
  const [hoveredElement, setHoveredElement] = React.useState<Element | null>(null)
  const [elementText, setElementText] = React.useState('')
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const togglePointAndAskMode = () => {
    setPointAndAskActive(!pointAndAskActive)
  }

  const handleMouseOver = (event: MouseEvent) => {
    if (!pointAndAskActive) return
    if (hoveredElement) {
      hoveredElement.classList.remove('highlight')
    }
    const target = event.target as Element
    target.classList.add('highlight')
    setHoveredElement(target)
  }

  const handleElementClick = () => {
    if (!pointAndAskActive || !hoveredElement) return
    setElementText(hoveredElement.textContent || '')
    setDialogOpen(true) // Open the dialog
    hoveredElement.classList.add('highlight') // Ensure the clicked element is highlighted
    setPointAndAskActive(false) // Temporarily disable pointAndAsk mode
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setPointAndAskActive(false)
      document.querySelectorAll('.highlight').forEach((el) => {
        el.classList.remove('highlight')
      })
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [pointAndAskActive, hoveredElement])

  React.useEffect(() => {
    if (pointAndAskActive) {
      document.addEventListener('mouseover', handleMouseOver)
      document.addEventListener('click', handleElementClick)
    } else {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('click', handleElementClick)
      if (hoveredElement) {
        hoveredElement.classList.remove('highlight')
      }
      document.querySelectorAll('.highlight').forEach((el) => {
        el.classList.remove('highlight')
      })
    }
    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('click', handleElementClick)
    }
  }, [hoveredElement, pointAndAskActive])

  if (hidden) {
    return null
  }

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
      <Dialog.Root
        open={dialogOpen}
        onOpenChange={(isOpen) => {
          setDialogOpen(isOpen)
          if (!isOpen) {
            setPointAndAskActive(false) // Turn off pointAndAsk mode when dialog is closed
            document.querySelectorAll('.highlight').forEach((el) => {
              el.classList.remove('highlight')
            })
          }
        }}
      >
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
              <Dialog.Trigger asChild>
                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  Smarter Page Search
                  <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    <MagnifyingGlassIcon />
                  </div>
                </DropdownMenu.Item>
              </Dialog.Trigger>
              <DropdownMenu.Item
                onClick={togglePointAndAskMode}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              >
                Point and Ask Mode
                <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  <CursorArrowIcon />
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                Settings
                <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  <GearIcon />
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => dispatch(setHidden(!hidden))}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              >
                Hide Assistant
                <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  <EyeClosedIcon />
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            {pointAndAskActive ? (
              <PointAndAskDialogBody highlightedText={elementText} />
            ) : (
              <SmarterSearchDialogBody />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

document.head.insertAdjacentHTML(
  'beforeend',
  '<style>.highlight { background-color: rgba(255, 255, 0, 0.5); }</style>',
)

export default DraggableButton
