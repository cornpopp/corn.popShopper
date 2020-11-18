const router = require('express').Router()
const {connect} = require('..')
// const session = require('express-session')
const {Order, CartItem, Product} = require('../db/models')
// const passport = require('passport')
// const {sessionStore} = require('express-session')
// const Session = require('../index')
module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
  console.log('api/orders')
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// GET /api/orders/shopping_cart
router.get('/shopping_cart', async (req, res, next) => {
  console.log('/api/orders/shopping_cart')
  try {
    if (req.user) {
      const order = await Order.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          submitted: false
        },
        include: Product
      })
      console.log('in orders route: ', order)
      res.json(order)
    } else {
      console.log('visitor')
      console.log('in orders api routes req.cookies ', req.cookies)
      const cookie = req.cookies['connect.sid']

      console.log('cookie = ', cookie)

      const order = await Order.findOrCreate({
        where: {
          visitorId: cookie,
          submitted: false
        },
        include: Product
      })
      console.log('visitor order added/updated', order)
      res.json(order)
    }
  } catch (error) {
    next(error)
  }
})

//POST /api/orders/:orderId/products
router.post('/:orderId/products/:productId', async (req, res, next) => {
  console.log('/api/orders/:orderId/products')
  try {
    const orderItem = await CartItem.findOrCreate({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      },
      defaults: {
        quantity: req.body.quantity
      }
    })
    console.log(orderItem)
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})
