import React, { useCallback, useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { MdCompareArrows } from 'react-icons/md'

import { validateNextTermPairsValue } from './functions/validateNextTermPairsValue'

import Input from '../../components/Input'
import NavBar from '../../components/NavBar'

import { SwitchTermPair } from './entities/SwitchTermPair'

import * as Styled from './styles'

const Settings: React.FC = () => {
  const [termPairs, setTermPairs] = useState<SwitchTermPair[]>([
    new SwitchTermPair()
  ])

  const handleTermInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>, termPair: SwitchTermPair) => {
      const { termType } = event.target.dataset

      const updatedTermPairs = validateNextTermPairsValue({
        term: event.target.value,
        termPair,
        currentTermPairs: termPairs,
        termType: termType as 'old' | 'new'
      })

      setTermPairs(updatedTermPairs)
    },
    [termPairs]
  )

  return (
    <Styled.Container>
      <NavBar />

      <Styled.Title>
        <FiSettings size={32} />
      </Styled.Title>

      <Styled.Content>
        <Styled.SettingsGroup>
          <strong className="header">Substituição de termos</strong>

          {termPairs.map((termPair) => (
            <Styled.TermSwitchContainer key={termPair.id}>
              <Input
                placeholder="TERMO_ANTIGO"
                data-term-type="old"
                defaultValue={termPair.oldTerm}
                onBlur={(event) => handleTermInputBlur(event, termPair)}
              />

              <MdCompareArrows size={40} />

              <Input
                placeholder="TERMO_NOVO"
                data-term-type="new"
                defaultValue={termPair.newTerm}
                onBlur={(event) => handleTermInputBlur(event, termPair)}
              />
            </Styled.TermSwitchContainer>
          ))}
        </Styled.SettingsGroup>
      </Styled.Content>
    </Styled.Container>
  )
}

export default Settings
