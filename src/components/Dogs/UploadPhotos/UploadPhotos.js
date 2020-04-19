import React from 'react'
import Dropzone from 'react-dropzone'
import Icon from '../../common/Icons/Icon'

const UploadPhotos = ({ callout, type }) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles) => callout(acceptedFiles)}
      accept='image/jpg, image/jpeg, image/png'
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='upload-photos'>
              <Icon icon={type} />
              <span className='upload-text-header'>
                <span>Upload {type === 'dog' ? 'Dog' : 'Your'} Photos</span>
              </span>
              <span className='upload-text'>
                Drag and drop photos here.
                <br />
                Or click here to find files.
                <br />
                (Only .jpg and .png files will be accepted)
              </span>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  )
}

export default UploadPhotos
