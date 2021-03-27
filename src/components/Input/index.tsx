import React from 'react'
import { IconType } from 'react-icons/lib'

import { Container, InputElement } from './styles'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType;
}

type InputType = React.ForwardRefExoticComponent<
  IInputProps & React.RefAttributes<HTMLInputElement>
>;

const Input: InputType = React.forwardRef(function Input (
  { icon: Icon, ...rest },
  forwardRef
) {
  return (
    <Container>
      {Icon && <Icon size={24} />}
      <InputElement ref={forwardRef} {...rest} />
    </Container>
  )
})

export default Input
