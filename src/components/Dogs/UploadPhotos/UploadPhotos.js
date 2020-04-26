import React, { useContext } from 'react'
import Dropzone from 'react-dropzone'
import Icon from '../../common/Icons/Icon'
import UserContext from '../../../UserContext'

const UploadPhotos = ({ callout, type }) => {
  let uc = useContext(UserContext)
  const ERROR_MESSAGE = (
    <>
      Check your file types (.jpg or .png)
      <br />
      and check your file sizes (max 5mb)
    </>
  )
  const START_MESSAGE = (
    <>
      Drag and drop photos
      <br />
      or click here to find photos.
    </>
  )
  const SUCCESS_MESSAGE = (
    <>
      Everything looks good!
      <br />
      Drop 'em now to upload.
    </>
  )

  const errorAlert = () => {
    uc.openSnack({
      message: ERROR_MESSAGE,
      isOpen: true,
    })
  }

  return (
    <Dropzone
      onDropAccepted={(acceptedFiles) => callout(acceptedFiles)}
      accept='image/jpg, image/jpeg, image/png'
      minSize={0}
      maxSize={5000000}
      onDropRejected={errorAlert}
      multiple
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={`upload-photos ${isDragActive ? 'hovered' : ''}`}>
              <Icon icon={type} />
              <span className='upload-text-header'>
                <span>Upload {type === 'dog' ? 'Dog' : 'Your'} Photos</span>
              </span>
              <span className='upload-text'>
                {!isDragReject && !isDragActive && START_MESSAGE}
                {!isDragReject && isDragActive && SUCCESS_MESSAGE}
                {isDragReject && ERROR_MESSAGE}
              </span>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  )
}

export default UploadPhotos
