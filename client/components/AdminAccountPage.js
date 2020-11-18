import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import {fetchAllUsers} from '../store/users'

export class AdminAccountPage extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.getAllUsers()
  }

  render() {
    const users = this.props.users

    const products = this.props.products.products

    return (
      <div id="admin-account">
        <h1>Admin Account Page</h1>

        <div className="tables">
          <h2>All Users</h2>
          {users.length < 1
            ? 'No Users'
            : users.map(user => (
                <div key={user.id}>
                  <div className="row">
                    <div className="column">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="column">{user.email}</div>
                  </div>
                </div>
              ))}
        </div>
        <div className="tables">
          <h2>All Products</h2>
          {products.length < 1
            ? 'No Products'
            : products.map(product => (
                <div key={product.id}>
                  <div className="row">
                    <div className="column">{product.name}</div>
                    <div className="column">
                      <NavLink to={`/products/${product.id}`}>
                        Product Info
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  users: state.users
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getAllUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapState, mapDispatch)(AdminAccountPage)
