import React, { useState, useContext } from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import { LOGIN, PRODUCT } from '../../constants/routes'
import { useHistory, useParams } from 'react-router-dom'

import { ModalContext } from '../../pages/Product'

const RatingModal = ({ children, onStarClick }) => {
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
        { user ? 'Leave rating' : 'Login to leave rating'}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          onStarClick()
          setModalVisible(false)
        }}
        onCancel={() => setModalVisible(false)}
      >
        { children }
      </Modal>
    </>
  )
}

export default RatingModal
