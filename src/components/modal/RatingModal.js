import React, { useState, useContext } from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import { LOGIN, PRODUCT } from '../../constants/routes'
import { useHistory, useParams } from 'react-router-dom'

import { ModalContext } from '../../pages/Product'
import TextArea from "antd/es/input/TextArea";

const RatingModal = ({ children, onStarClick, star, comment, setComment }) => {
  const { user } = useSelector((state) =>({...state}))
  const { modalVisible, setModalVisible } = useContext(ModalContext)

  let history = useHistory()
  const { slug } = useParams()

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true)
    } else {
      history.push({
        pathname: LOGIN,
        state: { from: `${PRODUCT}/${slug}` }
      })
    }
  }

  return (
    <>
      <div onClick={handleModal} >
        <StarOutlined className="text-danger"/>
        <br/>
        { user ? 'Відгук' : 'Авторизуйтесь'}
      </div>
      <Modal
        title="Залишити відгук"
        centered
        visible={modalVisible}
        onOk={() => {
          onStarClick()
          if (star !== 0)
            setModalVisible(false)
        }}
        onCancel={() => setModalVisible(false)}
      >
        { children }
          <TextArea
              className="mt-4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ваші враження"
              autoSize={{ minRows: 3, maxRows: 3 }}
          />
      </Modal>
    </>
  )
}

export default RatingModal
