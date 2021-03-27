import React from 'react'
import { AiFillBug, AiOutlineDiff } from 'react-icons/ai'

import { routesMap } from '../../config/routes-map'
import getSalutation from '../../utils/getSalutation'

import Card from '../../components/Card'

import * as SC from './styles'

const Home: React.FC = () => {
  const salutation = getSalutation()

  return (
    <SC.Container>
      <SC.Title>{salutation}</SC.Title>

      <SC.CardsContainer>
        <Card
          navigateTo={routesMap.CheckOwner.path}
          icon={AiOutlineDiff}
          title="Checar owner"
        />
        <Card
          disabled
          navigateTo={routesMap.Home.path}
          icon={AiFillBug}
          title="No more bugs"
        />
      </SC.CardsContainer>
    </SC.Container>
  )
}

export default Home
