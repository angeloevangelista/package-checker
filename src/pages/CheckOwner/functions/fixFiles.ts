import fs from 'fs'
import { promisify } from 'util'

import IFile from '../interfaces/IFile'

const fixFiles = async (
  filesToFix: IFile[],
  termToFind: string,
  termToSubstitute: string
): Promise<void> => {
  const promisedLoops = filesToFix.map(async (file) => {
    const fileContent = await file.text()

    const regexToBeSubstituted = new RegExp(termToFind, 'i')

    let fixedFileContent = fileContent

    while (fixedFileContent.match(regexToBeSubstituted)) {
      fixedFileContent = fixedFileContent.replace(
        regexToBeSubstituted,
        termToSubstitute
      )
    }

    const promisedWriteFile = promisify(fs.writeFile)

    try {
      await promisedWriteFile(file.path, fixedFileContent)
    } catch (error) {
      alert('An error ocurred updating the file' + error.message)
      console.log(error)
    }
  })

  await Promise.all(promisedLoops)
}

export default fixFiles
