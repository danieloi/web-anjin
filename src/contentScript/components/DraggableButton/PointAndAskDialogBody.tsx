import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import MagnifyingGlassIcon from '@radix-ui/react-icons/dist/MagnifyingGlassIcon'
import Dialog from '@radix-ui/react-dialog'
import Separator from '@radix-ui/react-separator'

type PointAndAskDialogBodyProps = {
  highlightedText: string
}
const PointAndAskDialogBody = ({ highlightedText }: PointAndAskDialogBodyProps) => {
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

export default PointAndAskDialogBody
