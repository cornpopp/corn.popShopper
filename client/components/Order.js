import React from 'react'

export class Order extends React.component {
  render() {
    return (
      <div id="order-form">
        <h2>List of Items:</h2>
        <div id="mappedproducts">
          {products.map(product => (
            <div key="cart">
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
      </div>
    )
  }
}
