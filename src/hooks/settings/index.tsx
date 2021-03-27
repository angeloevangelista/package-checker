import fs from 'fs'
import path from 'path'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { SwitchTermPair } from '../../pages/Settings/entities/SwitchTermPair'

interface ISettingsContext {
  switchTermPairs: SwitchTermPair[];
}

const SettingsContext = createContext<ISettingsContext>({} as ISettingsContext)

const SettingsProvider: React.FC = ({ children }) => {
  const [switchTermPairs, setSwitchTermPairs] = useState([])

  const loadSettings = useCallback(() => {
    console.log('Carregar configurações existentes')
  }, [])

  useEffect(() => {
    loadSettings()
  }, [])

  return (
    <SettingsContext.Provider value={{ switchTermPairs }}>
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = (): ISettingsContext => useContext(SettingsContext)

export { SettingsProvider, useSettings }
