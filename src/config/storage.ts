import path from 'path'

const homePath = process.env.HOMEPATH || process.env.HOME || ''

const storageConfig = {
  storagePath: path.join(homePath, 'package_checker'),
  settings: {
    fileName: 'package_checker_settings.json',
    version: 1.0
  }
}

export default storageConfig
