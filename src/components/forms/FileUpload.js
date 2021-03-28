import React from 'react'
import { useSelector } from 'react-redux'
import Resizer from 'react-image-file-resizer'

import { Avatar, Badge } from 'antd'

import { uploadFiles, removeFile } from '../../axios/files'

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

  const handleRemoveImage = (id) => {
    setLoading(true)

    removeFile(id, user.token)
      .then(res => {
        setLoading(false)
        const { images } = values

        let filteredImages = images.filter((item) => item.public_id !== id)
        setValues({ ...values, images: filteredImages })
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <div className="row">
        {values.images && values.images.map((i) => (
          <Badge count="X" key={i.public_id} onClick={() => handleRemoveImage(i.public_id)} style={{ cursor: 'pointer' }} >
            <Avatar
              src={i.url}
              size={100}
              shape="square"
              className="ml-3 mb-3"
            />
          </Badge>
        ))}
      </div>

      <div className="row">
        <label className="btn btn-primary btn-raised">
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
    </>
  )
}

export default FileUpload
