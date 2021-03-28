import { SwitchTermPair } from '../../../Settings/entities/SwitchTermPair'

import IFile from '../../interfaces/IFile'

import { replaceTerms } from './replaceTerms'
import { saveFixedFiles } from './saveFixedFiles'
import { fillEditableContent } from '../fillEditableContent'
import { fixOwnerInDefinition } from './fixOwnerInDefinition'

/**
 * This function groups the correction functions and corrects errors in the files
 *
 * @param files The files you want to fix
 * @param defaultOwner The default owner to use if it is not in package definitions
 * @param switchTermPairs Collection with terms substitution mapping
 */
export async function fixFiles (
  files: IFile[],
  defaultOwner: string,
  switchTermPairs: SwitchTermPair[]
): Promise<void> {
  await fillEditableContent(files)

  replaceTerms(files, switchTermPairs)

  fixOwnerInDefinition(files, defaultOwner)

  await saveFixedFiles(files)
}
