import IFile from '../../interfaces/IFile'

import { checkTermPairs } from './checkTermPairs'
import { fillEditableContent } from '../fillEditableContent'
import { fillIsOkAndReturnIt } from './fillIsOkAndReturnIt'
import { checkOwnerIsMissingAtDefinition } from './checkOwnerIsMissingAtDefinition'
import { checkPackagesInHeaderBodyAreTheSame } from './checkPackagesInHeaderBodyAreTheSame'

/**
 * This function groups the file validations
 *
 * @param filesToCheck The files you want to fix
 * @param termsToCheck Collection with terms to check if files contain
 * @param packagePrefix The prefix used for every Package
 *
 * @returns The result of check files
 */
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

  checkPackagesInHeaderBodyAreTheSame(files)

  console.log(...files.map(({ errors }) => errors))

  return fillIsOkAndReturnIt(files)
}

export default checkFiles
