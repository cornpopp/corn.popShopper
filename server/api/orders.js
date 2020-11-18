const router = require('express').Router()
const {Order, CartItem, Product} = require('../db/models')
const isAdmin = require('../../helpers/isAdminHelperFunc')

module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      res.sendStatus(404)
    } else if (isAdmin(req.user.id)) {
      const orders = await Order.findAll()
      res.json(orders)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/orders/shopping_cart
router.get('/shopping_cart', async (req, res, next) => {
  try {
    // console.log('req.user-->', req.user)
    if (req.user) {
      const order = await Order.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          submitted: false
        },
        include: Product
      })
      // console.log('in orders route: ', order)
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//POST /api/orders/:orderId/products
router.post('/:orderId/products/:productId', async (req, res, next) => {
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
    // console.log(orderItem)
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})
