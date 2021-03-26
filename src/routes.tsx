import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import CheckOwner from './pages/CheckOwner'

const Routes: React.FC = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={Home} />
      <Route path="/check-owner" component={CheckOwner} />
    </HashRouter>
  )
}

export default Routes
