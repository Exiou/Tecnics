import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import './styles.css'

interface Props {
  onFileUploaded: (file: File[]) => void
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('')

  const onDrop = useCallback(acceptedFiles => {
    const fileUrl = URL.createObjectURL(acceptedFiles[0])

    setSelectedFileUrl(fileUrl)
    onFileUploaded(acceptedFiles)

  }, [onFileUploaded])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />

      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt="Images" />
          :
          <div>
            <img src="" alt="" />
            <span>
              <strong>Arraste</strong> as imagens até aqui
              <br />
              ou
              <br />
              <strong>Clique</strong> para selecionar através do seu computador
            </span>
          </div>
      }
    </div>
  )
}

export default Dropzone