const router = require('express').Router()
const {User} = require('../db/models')
const isAdmin = require('../../helpers/isAdminHelperFunc')

module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    // console.log('req.user', req.user)
    // const isAdminfunc = isAdmin()
    // console.log('is it called: ', isAdminfunc)
    // isAdmin.map(user=> user.dataValues.id )
    if (req.user === undefined) {
      res.sendStatus(404)
    } else if (isAdmin(req.user.id)) {
      const users = await User.findAll()
      res.json(users)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      res.sendStatus(404)
    } else if (isAdmin(req.user.id)) {
      const user = await User.findByPk(req.params.userId)
      res.json(user)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
