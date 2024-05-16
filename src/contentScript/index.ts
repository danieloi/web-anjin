import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const body = document.querySelector('body')
const app = document.createElement('div')

app.id = 'web-anjin-react-root'

if (body) {
  body.appendChild(app)
}
const container = document.getElementById('web-anjin-react-root')

if (container) {
  const root = createRoot(container)
  // Render react component with a 3 second delay
  setTimeout(() => {
    root.render(React.createElement(App, null))
  }, 3000)
} else {
  console.error('Failed to find #react-root element')
}

console.info('contentScript is running')
