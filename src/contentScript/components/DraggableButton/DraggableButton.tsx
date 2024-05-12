import React from 'react'
import useDraggable from './useDraggable'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setActive } from '../../redux/slices/active.slice'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import {
  CursorArrowIcon,
  EyeClosedIcon,
  GearIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import * as Separator from '@radix-ui/react-separator'

const ORB_DIMENSIONS = 60

const DraggableButton = () => {
  const dispatch = useAppDispatch()

  const active = useAppSelector((state) => state.active.isActive)

  const { buttonRef, position, handleMouseDown } = useDraggable()

  const [pointAndAskActive, setPointAndAskActive] = React.useState(false)
  const [hoveredElement, setHoveredElement] = React.useState<Element | null>(null)
  const [elementText, setElementText] = React.useState('')

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
    // Optionally, trigger the smarter-page-search feature here
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
              <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
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
              <DialogBodyPointAndAsk highlightedText={elementText} />
            ) : (
              <DialogBodySmartSearch />
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

const DialogBodySmartSearch = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [apiResponse, setApiResponse] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false) // Add this line
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setIsLoading(true) // Set loading to true before the fetch call
      const response = await fetch(
        'https://88g84y9v17.execute-api.us-east-1.amazonaws.com/smarter-page-search',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: inputValue, siteText: document.body.innerText }),
        },
      )
      const data = await response.json() // Assuming the response is plain text
      setApiResponse(data.content)
      setIsLoading(false) // Set loading to false after the fetch call
    }
  }

  return (
    <>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <div>{isLoading ? <LoadingSpinner /> : <MagnifyingGlassIcon className="h-5 w-5" />}</div>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="name"
          placeholder="Ask me anything about this page"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </fieldset>

      <Dialog.Description className="text-mauve11 m-0 text-[13px]">
        Smarter Page Search uses AI to help you find the most relevant information on a webpage.
      </Dialog.Description>
      <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
      <p className="text-mauve11 m-0 text-[13px]">{apiResponse}</p>
    </>
  )
}

type DialogBodyPointAndAskProps = {
  highlightedText: string
}
const DialogBodyPointAndAsk = ({ highlightedText }: DialogBodyPointAndAskProps) => {
  const [inputValue, setInputValue] = React.useState('')
  const [apiResponse, setApiResponse] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false) // Add this line
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setIsLoading(true) // Set loading to true before the fetch call
      const response = await fetch(
        'https://88g84y9v17.execute-api.us-east-1.amazonaws.com/point-and-ask',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: inputValue,
            siteText: document.body.innerText,
            highlightedText,
          }),
        },
      )
      const data = await response.json() // Assuming the response is plain text
      setApiResponse(data.content)
      setIsLoading(false) // Set loading to false after the fetch call
    }
  }

  return (
    <>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <div>{isLoading ? <LoadingSpinner /> : <MagnifyingGlassIcon className="h-5 w-5" />}</div>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="name"
          placeholder="Ask me anything about what you pointed at"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </fieldset>

      <Dialog.Description className="text-mauve11 m-0 text-[13px]">
        Ask a question about the part of the page you just clicked on.
      </Dialog.Description>
      <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
      <p className="text-mauve11 m-0 text-[13px]">{apiResponse}</p>
    </>
  )
}

const LoadingSpinner = () => {
  return (
    <div className="text-violet11">
      <svg
        className="animate-spin -ml-1 h-5 w-5 text-violet11"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}

export default DraggableButton
