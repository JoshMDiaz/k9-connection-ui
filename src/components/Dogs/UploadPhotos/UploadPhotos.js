import React from 'react'
import Dropzone from 'react-dropzone'
import Icon from '../../common/Icons/Icon'

const UploadPhotos = ({ callout }) => {
  return (
    <Dropzone onDrop={acceptedFiles => callout(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='upload-photos'>
              <Icon icon='dog' />
              <span className='upload-text-header'>Upload Dog Photos</span>
              <span className='upload-text'>
                Drag and drop photos here.
                <br />
                Or click here to find files.
              </span>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  )
}

export default UploadPhotos
