import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const body = document.querySelector('body')
const app = document.createElement('div')

app.id = 'react-root'

if (body) {
  body.appendChild(app)
}
const container = document.getElementById('react-root')
if (container) {
  const root = createRoot(container)
  // Render react component
  root.render(React.createElement(App, null))
} else {
  console.error('Failed to find #react-root element')
}

console.info('contentScript is running')
