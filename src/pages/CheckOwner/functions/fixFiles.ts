import fs from 'fs'
import { promisify } from 'util'
import { SwitchTermPair } from '../../Settings/entities/SwitchTermPair'

import IFile from '../interfaces/IFile'

const removeBlankPairs = (termPairs: SwitchTermPair[]) =>
  termPairs.filter(({ newTerm, oldTerm }) => newTerm || oldTerm)

const fixFiles = async (
  filesToFix: IFile[],
  switchTermPairs: SwitchTermPair[]
): Promise<void> => {
  const promisedWriteFile = promisify(fs.writeFile)

  const promisedLoops = filesToFix.map(async (file: IFile) => {
    let fileContent = await file.text()

    removeBlankPairs(switchTermPairs).forEach(async ({ oldTerm, newTerm }) => {
      const oldTermRegex = new RegExp(oldTerm, 'gi')

      fileContent = fileContent.replace(oldTermRegex, newTerm)
    })

    try {
      await promisedWriteFile(file.path, fileContent)
    } catch (error) {
      alert('An error ocurred updating the file' + error.message)
      console.error(error)
    }
  })

  await Promise.all(promisedLoops)
}

export default fixFiles
