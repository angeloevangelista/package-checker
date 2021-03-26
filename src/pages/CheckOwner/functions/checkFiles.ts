import IFile from '../interfaces/IFile'

const checkFiles = async (
  filesToCheck: IFile[],
  termToFind: string
): Promise<IFile[]> => {
  const checkedFiles: IFile[] = []

  const promisedLoops = filesToCheck.map(async (file) => {
    const fileContent = await file.text()
    const regexToTest = new RegExp(termToFind, 'i')

    const fileContainsTerm = fileContent.match(regexToTest)

    file.isOk = !fileContainsTerm

    checkedFiles.push(file)
  })

  await Promise.all(promisedLoops)

  return checkedFiles
}

export default checkFiles
