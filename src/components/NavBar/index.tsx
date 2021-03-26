import { useHistory } from 'react-router'
import React, { useCallback } from 'react'
import { FiArrowLeft } from 'react-icons/fi'

import { Container, ReturnContainer } from './styles'

interface INavBarProps {
  returnTo: string;
}

const NavBar: React.FC<INavBarProps> = ({ returnTo }) => {
  const history = useHistory()

  const handleGoBack = useCallback(() => {
    history.push(returnTo)
  }, [])

  return (
    <Container>
      <ReturnContainer onClick={handleGoBack}>
        <FiArrowLeft size={24} />

        <strong>Voltar</strong>
      </ReturnContainer>
    </Container>
  )
}

export default NavBar
