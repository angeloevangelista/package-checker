import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const Title = styled.div`
  color: #444;
  font-weight: 700;
  font-size: 20px;

  margin: 20px;
`

export const CardsContainer = styled.div`
  width: 100%;

  margin: 0 auto;
  padding: 10px 40px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`
