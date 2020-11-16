import React from 'react'
import {fetchSingleProduct} from '../store/singleproduct'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/products'

class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      this.props.loadSingleProduct(this.props.match.params.productId)
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    const product = this.props.product
    return (
      <div>
        {product.map(product => (
          <div id="single-product" key="single-product">
            <img id="single-product-img" src={product.image} />
            <h3>{product.name}</h3>
            <p>{product.origPrice}</p>
            <p>{product.resellPrice}</p>
            <p>{product.description}</p>
          </div>
        ))}
        <form>
          <label htmlFor="quantity">Quantity: </label>
          <input type="number" id="quantity" name="quantity" />
          <button type="submit">Add To Cart</button>
        </form>
        <Link to="/products">Return to All Products</Link>
      </div>
    )
  }
}
const mapState = state => {
  return {
    product: state.product
  }
}
const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addItemToCart: product => dispatch(addToCart(product))
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
