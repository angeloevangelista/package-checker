import IFile from '../../interfaces/IFile'

export function checkTermPairs (files: IFile[], termsToCheck: string[]): void {
  termsToCheck = termsToCheck.filter((term) => !!term.trim())

  files.forEach((file) => {
    const fileContainsTerm = termsToCheck.some((term) => file.editableContent.match(new RegExp(term, 'i'))
    )

    fileContainsTerm &&
      file.errors.push('✅ Contém algum dos termos de troca definidos.')
  })
}
