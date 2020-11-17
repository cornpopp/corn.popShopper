import React from 'react'
import ProductDetail from './ProductDetail'
import {fetchProducts} from '../store/products'
import {addToCart} from '../store/orders'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(product, orderId) {
    // this.props.fetchSingleOrder(orderId)
    this.props.addProductToCart(product, orderId)
  }

  componentDidMount() {
    // console.log('Mounted')
    this.props.getProducts()
  }

  render() {
    const {products} = this.props.products

    return (
      <div className="content-wrapper">
        <div className="products">
          <h2>All Products</h2>
          {products.length < 1
            ? 'No Products'
            : products.map(product => (
                <div key={product.id}>
                  <NavLink to={`/products/${product.id}`}>
                    <ProductDetail
                      product={product}
                      order={this.props.order}
                      handleClick={this.handleClick}
                    />
                  </NavLink>
                </div>
              ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  order: state.order
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  addProductToCart: (product, orderId) => dispatch(addToCart(product, orderId)),
  fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId))
})

export default connect(mapState, mapDispatch)(AllProducts)
