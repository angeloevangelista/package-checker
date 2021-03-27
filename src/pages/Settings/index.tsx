import React, { useCallback } from 'react'
import { FiSettings } from 'react-icons/fi'
import { MdCompareArrows } from 'react-icons/md'

import { useSettings } from '../../hooks/settings'

import { validateNextTermPairsValue } from './functions/validateNextTermPairsValue'

import Input from '../../components/Input'
import NavBar from '../../components/NavBar'
import Button from '../../components/Button'

import { SwitchTermPair } from './entities/SwitchTermPair'

import * as SC from './styles'

const Settings: React.FC = () => {
  const { switchTermPairs, updateTermPairs, saveSettings } = useSettings()

  const handleTermInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>, termPair: SwitchTermPair) => {
      const { termType } = event.target.dataset

      const updatedTermPairs = validateNextTermPairsValue({
        term: event.target.value,
        termPair,
        currentTermPairs: switchTermPairs,
        termType: termType as 'old' | 'new'
      })

      updateTermPairs(updatedTermPairs)
    },
    [switchTermPairs]
  )

  return (
    <SC.Container>
      <NavBar />

      <SC.Title>
        <FiSettings size={32} />
      </SC.Title>

      <SC.Content>
        <SC.SettingsGroup>
          <strong className="header">Substituição de termos</strong>

          {switchTermPairs &&
            switchTermPairs.map((termPair) => (
              <SC.TermSwitchContainer key={termPair.id}>
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
              </SC.TermSwitchContainer>
            ))}
        </SC.SettingsGroup>

        <SC.Footer>
          <Button onClick={saveSettings}>Salvar</Button>
        </SC.Footer>
      </SC.Content>
    </SC.Container>
  )
}

export default Settings
