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
}

const settingsStorageService = new SettingsStorageService()

const SettingsContext = createContext<ISettingContext>({} as ISettingContext)

const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<ISettings>({} as ISettings)
  const [termPairs, setTermPairs] = useState<SwitchTermPair[]>([])

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

  const refreshSettings = useCallback(() => {
    const loadedSettings = settingsStorageService.loadSettings()

    setTermPairs(loadedSettings.switchTermPairs)
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
        settingsVersion: settings.settingsVersion,
        switchTermPairs: termPairs,

        saveSettings,
        refreshSettings,
        updateTermPairs
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = (): ISettingContext => useContext(SettingsContext)

export { SettingsProvider, useSettings }
