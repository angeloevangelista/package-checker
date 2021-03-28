import { SwitchTermPair } from '../../../Settings/entities/SwitchTermPair'

import IFile from '../../interfaces/IFile'

import { replaceTerms } from './replaceTerms'
import { saveFixedFiles } from './saveFixedFiles'
import { fillEditableContent } from './fillEditableContent'

/**
 * This function groups the correction functions and corrects errors in the files
 *
 * @param files The files you want to fix
 * @param switchTermPairs Collection with terms substitution mapping
 */
export async function fixFiles (
  files: IFile[],
  switchTermPairs: SwitchTermPair[]
): Promise<void> {
  await fillEditableContent(files)

  replaceTerms(files, switchTermPairs)

  await saveFixedFiles(files)
}
