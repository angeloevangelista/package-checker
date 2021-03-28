import IFile from '../../interfaces/IFile'
import { SwitchTermPair } from '../../../Settings/entities/SwitchTermPair'

/**
 * This function replaces the `editableContent` property of `IFile`
 * where there is any occurrence of the terms given
 *
 * @param files The files you want to replace terms
 * @param switchTermPairs Collection with terms substitution mapping
 */
export function replaceTerms (
  files: IFile[],
  switchTermPairs: SwitchTermPair[]
): void {
  files.forEach((file: IFile) => {
    switchTermPairs
      .filter(({ newTerm, oldTerm }) => newTerm || oldTerm)
      .forEach(({ oldTerm, newTerm }) => {
        const oldTermRegex = new RegExp(oldTerm, 'gi')

        file.editableContent = file.editableContent.replace(
          oldTermRegex,
          newTerm
        )
      })
  })
}
