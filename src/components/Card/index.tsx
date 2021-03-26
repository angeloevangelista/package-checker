import { IconType } from 'react-icons'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from './style'

interface ICardProps {
  title: string;
  disabled?: boolean;
  navigateTo: string;

  icon: IconType;
}

const Card: React.FC<ICardProps> = ({
  title,
  navigateTo,
  disabled = false,
  icon: Icon
}) => {
  const history = useHistory()

  const handleNavigate = useCallback(() => {
    !disabled && history.push(navigateTo)
  }, [])

  return (
    <Container disabled={disabled} onClick={handleNavigate}>
      <Icon size={32}></Icon>

      {title}
    </Container>
  )
}

export default Card
