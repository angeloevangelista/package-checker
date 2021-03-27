import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { SettingsProvider } from './hooks/settings'

import Routes from './routes'
import { GlobalStyle } from './styles/GlobalStyle'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <Routes />
        <GlobalStyle />
      </SettingsProvider>
    </BrowserRouter>
  )
}

render(<App />, mainElement)
