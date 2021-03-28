import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import ISettings from '../../services/SettingsStorageService/ISettings'

import { SettingsStorageService } from '../../services/SettingsStorageService'
import { SwitchTermPair } from '../../pages/Settings/entities/SwitchTermPair'

interface ISettingContext extends ISettings {
  refreshSettings: VoidFunction;
  saveSettings: VoidFunction;
  updateTermPairs: (termPairs: SwitchTermPair[]) => void;
  updateDefaultOwner: (owner: string) => void;
}

const settingsStorageService = new SettingsStorageService()

const SettingsContext = createContext<ISettingContext>({} as ISettingContext)

const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<ISettings>({} as ISettings)
  const [termPairs, setTermPairs] = useState<SwitchTermPair[]>([])
  const [defaultOwner, setDefaultOwner] = useState<string>('')

  const updateTermPairs = useCallback(
    (newTermPairs: SwitchTermPair[]) => {
      setSettings({
        ...settings,
        switchTermPairs: newTermPairs
      })

      setTermPairs(newTermPairs)
    },
    [settings]
  )

  const updateDefaultOwner = useCallback(
    (owner) => {
      setSettings({
        ...settings,
        defaultOwner: owner
      })

      setDefaultOwner(owner)
    },
    [settings]
  )

  const refreshSettings = useCallback(() => {
    const loadedSettings = settingsStorageService.loadSettings()

    setTermPairs(loadedSettings.switchTermPairs)
    setDefaultOwner(loadedSettings.defaultOwner)
    setSettings(loadedSettings)
  }, [])

  const saveSettings = useCallback(() => {
    alert('Saving')
    settingsStorageService.saveSettings(settings)
  }, [settings])

  useEffect(refreshSettings, [])

  return (
    <SettingsContext.Provider
      value={{
        defaultOwner,
        switchTermPairs: termPairs,
        settingsVersion: settings.settingsVersion,

        saveSettings,
        updateTermPairs,
        refreshSettings,
        updateDefaultOwner
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = (): ISettingContext => useContext(SettingsContext)

export { SettingsProvider, useSettings }
