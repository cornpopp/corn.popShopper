import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder} from '../store/orders'

export class ShoppingCart extends React.Component {
  componentDidMount() {
    this.props.fetchSingleOrder()
  }
  render() {
    const products = this.props.order.products

    console.log('in component this.props: ', this.props)
    console.log('in component products = ', products)

    return (
      <div className="content-wrapper">
        <div id="shoppingcartview">
          <h2>List of Items:</h2>
          <div id="mappedproducts">
            {products.length < 1
              ? 'No Products In Your Cart'
              : products.map(product => (
                  <div key={product.id} className="shopping-cart-item">
                    <div className="row">
                      <div className="column">{product.name}</div>
                      <div className="column">${product.resellPrice}</div>
                      <div className="column">
                        <form>
                          <label htmlFor="quantity" min="1">
                            Quantity:{' '}
                          </label>
                          <input type="number" id="quantity" name="quantity" />
                          <button type="submit">Remove Item</button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <Link to="/checkout">
            <button type="submit">Go To Checkout</button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  order: state.order
})

const mapDispatch = dispatch => ({
  // addProductToCart: product => dispatch(addToCart(product)),
  fetchSingleOrder: () => dispatch(fetchSingleOrder())
})

export default connect(mapState, mapDispatch)(ShoppingCart)
