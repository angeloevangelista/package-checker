import IFile from '../interfaces/IFile'

const checkFiles = async (
  filesToCheck: IFile[],
  termsToFind: string[]
): Promise<IFile[]> => {
  const checkedFiles: IFile[] = []
  termsToFind = termsToFind.filter((term) => !!term.trim())

  const promisedLoops = filesToCheck.map(async (file) => {
    const fileContent = await file.text()

    const fileContainsTerm = termsToFind.some((term) =>
      fileContent.match(new RegExp(term, 'i'))
    )

    file.isOk = !fileContainsTerm

    checkedFiles.push(file)
  })

  await Promise.all(promisedLoops)

  return checkedFiles
}

export default checkFiles
