import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import indexCss from './index.css?inline'

const body = document.querySelector('body')
const appContainer = document.createElement('div')

appContainer.id = 'web-anjin-react-root'

try {
  if (body) {
    body.appendChild(appContainer)
    const shadowRoot = appContainer.attachShadow({ mode: 'open' })

    // Create a style element for Tailwind CSS
    const style = document.createElement('style')
    // Assuming you have a build process that outputs Tailwind CSS to a specific file
    // You need to fetch this CSS and then apply it here
    console.log({ indexCss })
    style.textContent = indexCss
    shadowRoot.appendChild(style)

    const reactRootDiv = document.createElement('div')
    reactRootDiv.id = 'shadow-root-react-root'
    shadowRoot.appendChild(reactRootDiv)

    const root = createRoot(reactRootDiv)
    setTimeout(() => {
      root.render(React.createElement(App, null))
    }, 3000)
  }
} catch (error) {
  console.error('Failed to find #react-root element')
}
console.info('contentScript is running')
