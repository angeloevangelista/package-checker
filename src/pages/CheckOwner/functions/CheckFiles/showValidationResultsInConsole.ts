import IFile from '../../interfaces/IFile'

/**
 * This functions prints on console the validation results
 *
 * @param files The files with `errors` property populated
 */
export function showValidationResultsInConsole (files: IFile[]): void {
  const totalOfErrors = files.reduce(
    (accumulator, { errors }) => accumulator + errors.length,
    0
  )

  if (!totalOfErrors) {
    console.log('Sem erros 😉')

    return
  }

  console.log(`Total de erros: ${totalOfErrors}`)
  console.log()

  files.forEach(({ name, errors }) => {
    if (!errors.length) return

    console.log(`Filename: ${name}`)
    errors.forEach((error) => console.log(`${error}`))
    console.log('\n')
  })
}
