import React, { useState, useEffect} from 'react'
import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from "../../axios/user"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'

const WishList = () => {
    const [wishlist, setWishlist] = useState([])
    const { user } = useSelector(state => ({...state}))

    useEffect(() => {
        loadWishlist()
    }, [])

    const loadWishlist = () =>
        getWishlist(user.token)
            .then(res => {
                console.log(res);
                setWishlist(res.data.wishlist)
            })
            .catch(err => console.log(err))

    const handleRemove = (productId) =>
        removeWishlist(productId, user.token)
            .then((res) => {
                loadWishlist()
            })
            .catch(err => console.log(err))

    return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-2">
              <UserNav />
            </div>
            <div className="col">
                <h4>Улюблені</h4>
                <hr/>
                { wishlist && wishlist.map(item => (
                    <div key={item._id} className="alert alert-custom">
                        <Link to={`/product/${item.slug}`}>
                            {item.title}
                        </Link>
                        <span
                            className="btn btn-sm float-right mb-1"
                            onClick={() => handleRemove(item._id)}
                        >
                            <DeleteOutlined className="text-danger" />
                        </span>
                    </div>
                )) }
            </div>
          </div>
        </div>
    )
}

export default WishList
