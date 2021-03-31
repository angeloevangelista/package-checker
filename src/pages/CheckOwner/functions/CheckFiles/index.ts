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

  showValidationResultsInConsole(files)

  return fillIsOkAndReturnIt(files)
}

export default checkFiles

function showValidationResultsInConsole (files: IFile[]) {
  const totalOfErrors = files.reduce(
    (accumulator, currentValue) => currentValue.errors.length,
    0
  )

  if (!totalOfErrors) {
    console.log('Sem erros.')

    return
  }

  console.log('Erros:')
  console.log()

  files.forEach(({ name, errors }) => {
    if (!errors.length) return

    console.log(`Filename: ${name}`)
    errors.forEach((error) => console.log(`- ${error}`))
  })
}
