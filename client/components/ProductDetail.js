import React from 'react'
import {NavLink} from 'react-router-dom'

const ProductDetail = props => {
  // console.log('this.props.products.products ', this.props.products.products)
  // console.log('this.props.products ', this.props.products)
  // console.log('products ', products)

  const {handleClick, product, order} = props

  // console.log('order ', order)
  // console.log('order.id ', order.id)

  return (
    <div className="product-detail-wrapper">
      <div key={props.id} className="product-child">
        <div key={product.id}>
          <div className="product-name">{product.name}</div>
          <div className="product-img">
            <img src={product.image} />
          </div>
          <div className="product-orig-price">
            Original Price: {product.origPrice}
          </div>
          <div className="product-resell-price">
            Resell Price: {product.resellPrice}
          </div>
          <div className="product-description">{product.description}</div>
          <div className="product-rating">Ratings: {product.rating}</div>
          <form id="stock">
            <label htmlFor="stock">Stock: {product.stock}</label>
          </form>
          <NavLink to={`/products/${product.id}`}>See Product Details</NavLink>
          <button
            className="add-to-cart-button"
            type="button"
            onClick={() => handleClick(product, order.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
