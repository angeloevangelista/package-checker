/**
 * This function gives a list of defined procedure names in the given content
 *
 * @param content The package content you want to get the defined procedures,
 * its expected to be a Package Header or a Body
 *
 * @returns An string array with the procedure names
 */
export function getDefinedProcedures (content: string): string[] {
  const procedureDefinitionLines = content
    .split('\n')
    .filter((line) => line.match(/PROCEDURE/i))

  const definedProcedures = procedureDefinitionLines.map((line) => {
    const [, procedureName] = line.replace(/"/, '').trim().split(' ')

    return procedureName
      .trim()
      .replace(/"/, '')
      .replace(/\(/, '')
      .replace(/\)/, '')
  })

  return definedProcedures
}
