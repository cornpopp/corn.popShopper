const router = require('express').Router()
const {Product} = require('../db/models')
const isAdmin = require('../../helpers/isAdminHelperFunc')

module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    console.log('getting single product')
    console.log('req.params.productId = ', req.params.productId)
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    if (isAdmin) {
      const newProduct = await Product.create(req.body)
      res.json(newProduct)
    }
  } catch (error) {
    next(error)
  }
})

// PUT /api/products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    if (isAdmin) {
      const product = await Product.findByPk(req.params.productId)
      const updatedProduct = await product.update(req.body)
      res.status(200).send(updatedProduct)
    }
  } catch (error) {
    next(error)
  }
})

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    if (isAdmin) {
      const id = req.params.productId
      await Product.destroy({where: {id}})
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
