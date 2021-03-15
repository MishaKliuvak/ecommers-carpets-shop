import React from 'react'
import { useSelector } from 'react-redux'
import Resizer from 'react-image-file-resizer'

import { uploadFiles } from '../../axios/files'

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector(state => ({...state}))

  const fileUploadAndResize = (e) => {
    let files = e.target.files
    let allUploadedFiles = values.images

    if (files) {
      setLoading(true)

      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
          uploadFiles(uri, user.token)
            .then(res => {
              console.log(res)
              setLoading(false)
              allUploadedFiles.push(res.data)

              setValues({ ...values, images: allUploadedFiles })
            })
            .catch(err => {
              console.log(err)
              setLoading(false)
            })
        }, 'base64')
      }
    }
  }

  return (
    <div className="row">
      <label className="btn btn-primary ">
        Choose file
        <input
          type="file"
          multiple
          accept="images/*"
          hidden
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  )
}

export default FileUpload
