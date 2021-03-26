import crypto from 'crypto'
import React, { useCallback } from 'react'
import { GoFile, GoFileDirectory } from 'react-icons/go'

import { Container, FileSelector } from './styles'

interface IFileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: 'directory' | 'file';
}

type TFileInputType = React.ForwardRefExoticComponent<
  IFileInputProps & React.RefAttributes<HTMLInputElement>
>;

const FileInput: TFileInputType = React.forwardRef(function FileInput (
  { name, type, ...rest },
  forwardedRef
) {
  const internalReferenceID = `${name}-${crypto.randomBytes(4)}`

  const getInputTypeProps = useCallback(() => {
    const inputTypeProps: {
      directory?: string;
      webkitdirectory?: string;
    } = {}

    switch (type) {
      case 'directory':
        inputTypeProps.directory = ''
        inputTypeProps.webkitdirectory = ''
        break

      case 'file':
        break
    }

    return inputTypeProps
  }, [])

  return (
    <Container>
      <FileSelector htmlFor={internalReferenceID}>
        {type === 'file' ? <GoFile size={24} /> : <GoFileDirectory size={24} />}

        <strong>
          {type === 'file' ? 'Selecionar arquivo' : 'Selecionar diretório'}
        </strong>
      </FileSelector>

      {/* <InputDetails>
        <div>
          <strong>Arquivo:</strong>
          <span>Nome do arquivo</span>
        </div>
      </InputDetails> */}

      <input
        ref={forwardedRef}
        id={internalReferenceID}
        type="file"
        {...getInputTypeProps()}
        {...rest}
      />
    </Container>
  )
})

export default FileInput
