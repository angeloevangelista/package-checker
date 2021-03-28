import IFile from '../../interfaces/IFile'

/**
 * This function uses `errors` array to fill `isOK` property,
 * informing if file contains errors or its ok
 *
 * @param files The files will want to check
 * @returns The files with `isOk` property filled
 */
export function fillIsOkAndReturnIt (
  files: IFile[]
): IFile[] | PromiseLike<IFile[]> {
  return files.map((file) => {
    file.isOk = !file.errors?.length

    return file
  })
}
