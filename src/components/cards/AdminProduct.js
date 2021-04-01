import React from 'react'
import { Card } from 'antd'
import custom from '../../images/default.png'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ADMIN_SINGLE_PRODUCT } from '../../constants/routes'
const { htmlToText } = require('html-to-text')
const { Meta } = Card

const AdminProduct = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product

  return (
    <Card
      hoverable
      cover={
        <img
          src={images.length ? images[0].url : custom}
          alt={title}
          style={{ height: 150, objectFit: 'cover' }}
          className="p-1"
        />
      }

      actions={[
        <Link to={`${ADMIN_SINGLE_PRODUCT}/${slug}`}>
          <EditOutlined />
        </Link>,
        <DeleteOutlined className="text-danger" onClick={() => handleRemove(slug)}/>
      ]}
    >
      <Meta style={{ height: 80, overflow: 'hidden' }} title={title} description={htmlToText(description)} />
    </Card>
  )
}

export default AdminProduct
