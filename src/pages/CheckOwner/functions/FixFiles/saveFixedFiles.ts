import fs from 'fs'
import { promisify } from 'util'

import IFile from '../../interfaces/IFile'

/**
 * This function updates physically the files with its corrections stored
 * in `editableContent` property of type `IFile`
 *
 * @param files The files will be saved
 */
export async function saveFixedFiles (files: IFile[]): Promise<void> {
  const promisedWriteFile = promisify(fs.writeFile)

  const promisedLoops = files.map(async (file: IFile) => {
    try {
      await promisedWriteFile(file.path, file.editableContent, {
        encoding: 'utf-8'
      })
    } catch (error) {
      alert('An error ocurred updating the file' + error.message)
      console.error(error)
    }
  })

  await Promise.all(promisedLoops)
}
