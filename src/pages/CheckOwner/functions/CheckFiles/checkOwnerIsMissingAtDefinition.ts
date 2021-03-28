import IFile from '../../interfaces/IFile'

/**
 * This function check if there is any missing owner at package definition
 *
 * @param files The files you want to check
 * @param packagePrefix The prefix used for every Package
 *
 * @returns The result of validation for missing owners at definitions
 */
export function checkOwnerIsMissingAtDefinition (
  files: IFile[],
  packagePrefix: string
): boolean {
  let missingOwner = false

  files.forEach((file) => {
    const lines = file.editableContent.split('\n')

    const definitionLines = lines.filter((line) =>
      line.trim().match(/CREATE/i)
    )

    const someOfDefinitionsIsMissingOwner = definitionLines.some(
      (definitionLine) => {
        const packageNameBeginIndex = definitionLine.indexOf(packagePrefix)

        const definitionHasOwner = definitionLine
          .slice(packageNameBeginIndex - 2, packageNameBeginIndex)
          .includes('.')

        return !definitionHasOwner
      }
    )

    someOfDefinitionsIsMissingOwner &&
      file.errors.push('✅ A package não possui owner no Header e/ou Body.')

    if (someOfDefinitionsIsMissingOwner && !missingOwner) missingOwner = true
  })

  return missingOwner
}
