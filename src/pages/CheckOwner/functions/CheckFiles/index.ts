import IFile from '../../interfaces/IFile'

import { checkTermPairs } from './checkTermPairs'
import { fillEditableContent } from '../fillEditableContent'
import { fillIsOkAndReturnIt } from './fillIsOkAndReturnIt'
import { checkOwnerIsMissingAtDefinition } from './checkOwnerIsMissingAtDefinition'

async function checkFiles (
  filesToCheck: IFile[],
  termsToCheck: string[],
  packagePrefix: string
): Promise<IFile[]> {
  const files: IFile[] = filesToCheck.map((file) => {
    file.errors = []

    return file
  })

  await fillEditableContent(files)

  checkTermPairs(files, termsToCheck)

  checkOwnerIsMissingAtDefinition(files, packagePrefix)

  return fillIsOkAndReturnIt(files)
}

export default checkFiles
