import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchSingleOrder,
  setItemQuantity,
  removeFromCart
} from '../store/orders'

export class ShoppingCart extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete(orderId, productId) {
    this.props.removeFromCart(orderId, productId)
    this.props.fetchSingleOrder()
  }
  handleSubmit(product, quantity) {
    this.props.setQuantity(product, quantity)
    this.props.fetchSingleOrder()
  }
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
                        Quantity: {product.cartItem.quantity}
                      </div>
                      <div className="column">
                        <form>
                          <label htmlFor="quantity">Change Quantity: </label>
                          <input
                            type="number"
                            id="quantity-form"
                            name="quantity"
                            min="0"
                          />
                          <button
                            className="update-cart-button"
                            type="button"
                            onClick={() =>
                              this.handleSubmit(
                                product,
                                document.getElementById('quantity-form').value
                              )
                            }
                          >
                            Update Cart
                          </button>
                          <button
                            className="remove-button"
                            type="button"
                            onClick={() =>
                              this.handleDelete(this.props.order.id, product.id)
                            }
                          >
                            Remove Item
                          </button>
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
  order: state.order,
  quantity: state.quantity
})

const mapDispatch = dispatch => ({
  // addProductToCart: product => dispatch(addToCart(product)),
  fetchSingleOrder: () => dispatch(fetchSingleOrder()),
  setQuantity: (product, quantity) =>
    dispatch(setItemQuantity(product, quantity)),
  removeFromCart: (orderId, productId) =>
    dispatch(removeFromCart(orderId, productId))
})

export default connect(mapState, mapDispatch)(ShoppingCart)
