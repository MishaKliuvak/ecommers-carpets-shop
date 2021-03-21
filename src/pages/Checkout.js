import React from 'react'

const Checkout = () => {
  const saveAddress = () => {

  }

  return (
    <div className="row">
      <div className="col-md-6">
        <h4 className="mb-4">Delivery Address</h4>
        textarea

        <button
          className="btn btn-primary mt-2"
          onClick={saveAddress}
        >
          Save
        </button>
        <hr/>
        <h4 className="mb-2">Gor Coupon?</h4>
        Coupon input
      </div>

      <div className="col-md-6">
        <h4 className="mb-2">Order Summary</h4>
        <hr/>
        <p>Products x</p>
        <hr/>
        <p>List of products</p>
        <hr/>
        <p>Cart total: $x</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
            >
              Place Order
            </button>
            <button
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
