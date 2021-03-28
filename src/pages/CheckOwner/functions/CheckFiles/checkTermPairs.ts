import IFile from '../../interfaces/IFile'

/**
 * This function checks if there is any occurrence of the terms
 * at list and populates `errors` array at type `IFile`
 *
 * @param files The files you want to check
 * @param switchTermPairs Collection with terms substitution mapping
 */
export function checkTermPairs (files: IFile[], termsToCheck: string[]): void {
  termsToCheck = termsToCheck.filter((term) => !!term.trim())

  files.forEach((file) => {
    const fileContainsTerm = termsToCheck.some((term) =>
      file.editableContent.match(new RegExp(term, 'i'))
    )

    fileContainsTerm &&
      file.errors.push('✅ Contém algum dos termos de troca definidos.')
  })
}
