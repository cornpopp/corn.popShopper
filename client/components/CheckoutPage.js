import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/orders'
// import ShoppingCart from './ShoppingCart'

export class CheckoutPage extends React.Component {
  componentDidMount() {
    this.props.getSingleOrder()
  }

  render() {
    const products = this.props.order.products

    return (
      <div className="content-wrapper">
        <h1>Checkout</h1>
        <h2>Items in Cart:</h2>
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
        <div className="border-box">
          <h3>Shipping Information</h3>
          <form id="shipping-info-form">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" name="address" />
            <label htmlFor="city">City: </label>
            <input type="text" id="city" name="city" />
            <label htmlFor="state">State: </label>
            <input type="text" id="state" name="state" />
            <label htmlFor="postal code">Postal Code: </label>
            <input type="text" id="postal code" name="postal code" />
            <label htmlFor="phone">Phone: </label>
            <input type="number" id="phone" name="phone" />
          </form>
        </div>
        <div className="border-box">
          <h3>Payment Information</h3>
          <form>
            <label htmlFor="credit-card">Credit Card: </label>
            <input type="number" id="credit-card" name="credit-card" />
            <label htmlFor="expiration">Expiration Date: </label>
            <input type="date" id="expiration" name="expiration" />
            <label htmlFor="CVV">CVV: </label>
            <input type="number" id="CVV" name="CVV" />
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
            <label htmlFor="street-address">Street Address: </label>
            <input type="text" id="street-address" name="street-address" />
            <label htmlFor="city">City: </label>
            <input type="text" id="city" name="city" />
            <label htmlFor="state">State: </label>
            <input type="text" id="state" name="state" />
            <label htmlFor="postal-code">Postal Code: </label>
            <input type="number" id="postal-code" name="postal-code" />
            <label htmlFor="phone">Phone: </label>
            <input type="number" id="phone" name="phone" />
            <button type="submit" value="Submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  order: state.order
})

const mapDispatch = dispatch => ({
  getSingleOrder: () => dispatch(fetchSingleOrder())
})

export default connect(mapState, mapDispatch)(CheckoutPage)

{
  /* <div id="checkout-page">
        <h2>List of Items: </h2>
        {products.map(product => (
          <div key="orderlist">
            <table>
              <tr>
                <th>{product.name}</th>
                <th>{product.resellPrice}</th>
              </tr>
            </table>
            <form>
              <label htmlFor="quantity">Quantity: </label>
              <input type="number" id="quantity" name="quantity" />
              <button type="submit">Remove Item</button>
            </form>
          </div>
        ))}


      </div>
      </div> */
}

//table with flexbox
// <div key={product.id}>
//             <div class="row">
//               <div class="column">{product.name}</div>
//               <div class="column">
//                 <NavLink to={`/products/${product.id}`}>
//                   Product Info
//                 </NavLink>
//               </div>
//             </div>
//           </div>
