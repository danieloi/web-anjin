import { useState, useEffect } from 'react'
import * as Switch from '@radix-ui/react-switch'
import * as Label from '@radix-ui/react-label'
export const Popup = () => {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    // console.log('popup useEffect')
    chrome.storage.sync.get(['assistant'], (result) => {
      console.log({ result })
      setIsHidden(result.assistant.isHidden || false)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ assistant: { isHidden: isHidden } })
    chrome.runtime.sendMessage({ type: 'HIDDEN', isHidden })
  }, [isHidden])

  return (
    <main className="px-4 py-2 min-w-64">
      <form>
        <div className="flex items-center justify-between">
          <Label.Root className="text-[15px] font-medium leading-[35px] " htmlFor="show-assistant">
            Show Assistant
          </Label.Root>

          <Switch.Root
            className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
            id="show-assistant"
            // @ts-ignore
            style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
          >
            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>
      </form>
    </main>
  )
}

export default Popup
