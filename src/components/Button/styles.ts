import styled from 'styled-components'

interface IContainerProps {
  color: string;
}

export const Container = styled.button`
  display: flex;
  align-items: center;

  padding: 10px;

  font-weight: 700;
  text-transform: uppercase;

  border: 0;
  border-radius: 4px;
  background-color: ${props => props.color};

  color: #fff;

  svg {
    margin-right: 10px;
  }
`
