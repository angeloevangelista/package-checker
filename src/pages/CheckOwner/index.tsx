import { shell } from 'electron'
import {
  DiCodeBadge,
  MdRefresh,
  BiError,
  BiCheckDouble,
  AiOutlineTool,
  FiSettings
} from 'react-icons/all'
import React, { useCallback, useRef, useState } from 'react'

import { routesMap } from '../../config/routes-map'

import Button from '../../components/Button'
import NavBar from '../../components/NavBar'
import FileInput from '../../components/FileInput'

import IFile from './interfaces/IFile'

import fixFiles from './functions/fixFiles'
import checkFiles from './functions/checkFiles'

import { Container, MainContent, FileList, FlexContainer } from './styles'
import { Link } from 'react-router-dom'

const GLOBAL_TERM = 'HUEEEE'
const GLOBAL_SUBSTITUTE_TERM = 'TERM_01'

const CheckOwner: React.FC = () => {
  const [files, setFiles] = useState<IFile[]>([])
  const inputDirectoryRef = useRef<HTMLInputElement>(null)

  const handleOpenFile = useCallback((file: IFile) => {
    shell.openItem(file.path)
  }, [])

  const handleFixFiles = useCallback(() => {
    const filesToFix = files.filter((file) => !file.isOk)

    fixFiles(filesToFix, GLOBAL_TERM, GLOBAL_SUBSTITUTE_TERM).then(
      handleRecheck
    )
  }, [files])

  const handleRecheck = useCallback(() => {
    checkFiles(files, GLOBAL_TERM).then((checkedFiles) =>
      setFiles(checkedFiles)
    )
  }, [files])

  const handleDirectoryChange = useCallback(() => {
    if (!inputDirectoryRef.current) return

    const directoryFiles = Array.from(
      inputDirectoryRef.current.files || []
    ) as IFile[]

    checkFiles(directoryFiles, GLOBAL_TERM).then((checkedFiles) =>
      setFiles(checkedFiles)
    )
  }, [inputDirectoryRef])

  return (
    <Container>
      <NavBar>
        <Link to={routesMap.Settings.path}>
          <FiSettings size={24} />
        </Link>
      </NavBar>

      <MainContent>
        <FlexContainer>
          <FileInput
            type="directory"
            name="input-directory"
            ref={inputDirectoryRef}
            onChange={handleDirectoryChange}
          />

          {!!files.length && (
            <Button icon={MdRefresh} onClick={handleRecheck}>
              Checar novamente
            </Button>
          )}
        </FlexContainer>

        <FileList>
          <thead>
            <tr>
              <th>Nome</th>
              <th className="icon">Abrir</th>
              <th className="icon">Situação</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.name}>
                <td>{file.name}</td>

                <td className="icon">
                  <button type="button" onClick={() => handleOpenFile(file)}>
                    <DiCodeBadge size={24} />
                  </button>
                </td>

                <td className="icon">
                  {file.isOk ? (
                    <BiCheckDouble color="#5beb5b" size={24} />
                  ) : (
                    <BiError color="#e85b51" size={24} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </FileList>

        {!!files.some((file) => !file.isOk) && (
          <Button color="#5beb5b" icon={AiOutlineTool} onClick={handleFixFiles}>
            Corrigir todos
          </Button>
        )}
      </MainContent>
    </Container>
  )
}

export default CheckOwner
