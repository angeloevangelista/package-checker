import React from 'react'
import { AiFillBug, AiOutlineDiff } from 'react-icons/ai'

import getSalutation from '../../utils/getSalutation'

import Card from '../../components/Card'

import { Container, Title, CardsContainer } from './styles'

const Home: React.FC = () => {
  const salutation = getSalutation()

  return (
    <Container>
      <Title>{salutation}</Title>

      <CardsContainer>
        <Card
          navigateTo="check-owner"
          icon={AiOutlineDiff}
          title="Checar owner"
        />
        <Card disabled navigateTo="/" icon={AiFillBug} title="No more bugs" />
      </CardsContainer>
    </Container>
  )
}

export default Home
