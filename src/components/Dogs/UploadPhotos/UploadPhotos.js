import React, { useContext } from 'react'
import Dropzone from 'react-dropzone'
import Icon from '../../common/Icons/Icon'
import UserContext from '../../../UserContext'
import Plural from '../../common/Plural'

const UploadPhotos = ({ callout, type }) => {
  let uc = useContext(UserContext)
  const ERROR_MESSAGE = (
    <>
      Check your file types (.jpg or .png)
      <br />
      and check your file sizes (max 5mb)
    </>
  )
  const USER_ERROR_MESSAGE = (
    <>
      Check your file type (.jpg or .png) and
      <br />
      file sizes (max 5mb). Only upload 1 photo.
    </>
  )
  const START_MESSAGE = (
    <>
      Drag and drop <Plural number={type === 'user' ? 1 : 2} text='photo' />
      <br />
      or click here to find{' '}
      <Plural number={type === 'user' ? 1 : 2} text='photo' />.
    </>
  )
  const SUCCESS_MESSAGE = (
    <>
      Everything looks good!
      <br />
      Drop 'em now to upload.
    </>
  )
  const PAGE_ERROR_MESSAGE =
    type === 'user' ? USER_ERROR_MESSAGE : ERROR_MESSAGE

  const errorAlert = () => {
    uc.openSnack({
      message: PAGE_ERROR_MESSAGE,
      isOpen: true,
      duration: 5000,
    })
  }

  return (
    <Dropzone
      onDropAccepted={(acceptedFiles) => callout(acceptedFiles)}
      accept='image/jpg, image/jpeg, image/png'
      minSize={0}
      maxSize={5000000}
      onDropRejected={errorAlert}
      multiple={type !== 'user'}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={`upload-photos ${isDragActive ? 'hovered' : ''}`}>
              <Icon icon={type} />
              <span className='upload-text-header'>
                <span>
                  Upload {type === 'dog' ? 'Dog' : 'Your'}{' '}
                  <Plural number={type === 'user' ? 1 : 2} text='Photo' />
                </span>
              </span>
              <span className='upload-text'>
                {!isDragReject && !isDragActive && START_MESSAGE}
                {!isDragReject && isDragActive && SUCCESS_MESSAGE}
                {isDragReject && PAGE_ERROR_MESSAGE}
              </span>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  )
}

export default UploadPhotos
