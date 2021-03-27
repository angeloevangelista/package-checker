import fs from 'fs'
import { promisify } from 'util'
import { SwitchTermPair } from '../../Settings/entities/SwitchTermPair'

import IFile from '../interfaces/IFile'

const fixFiles = async (
  filesToFix: IFile[],
  switchTermPairs: SwitchTermPair[]
): Promise<void> => {
  const promisedLoops = filesToFix.map(async (file: IFile) => {
    switchTermPairs = switchTermPairs.filter(
      ({ newTerm, oldTerm }) => newTerm || oldTerm
    )

    const fileContent = await file.text()

    switchTermPairs.forEach(async ({ oldTerm, newTerm }) => {
      const regexToBeSubstituted = new RegExp(oldTerm, 'i')

      let fixedFileContent = fileContent

      while (fixedFileContent.match(regexToBeSubstituted)) {
        fixedFileContent = fixedFileContent.replace(
          regexToBeSubstituted,
          newTerm
        )
      }

      const promisedWriteFile = promisify(fs.writeFile)

      try {
        await promisedWriteFile(file.path, fixedFileContent)
      } catch (error) {
        alert('An error ocurred updating the file' + error.message)
        console.error(error)
      }
    })
  })

  await Promise.all(promisedLoops)
}

export default fixFiles
