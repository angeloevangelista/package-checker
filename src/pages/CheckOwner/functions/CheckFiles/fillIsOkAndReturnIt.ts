import IFile from '../../interfaces/IFile'

export function fillIsOkAndReturnIt (files: IFile[]): IFile[] | PromiseLike<IFile[]> {
  return files.map((file) => {
    file.isOk = !file.errors?.length

    return file
  })
}
