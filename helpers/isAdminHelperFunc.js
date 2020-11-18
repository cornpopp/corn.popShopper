const User = require('../server/db/models/user')

module.exports = async function(userId) {
  const isAdmin = await User.findAll({
    where: {
      isAdmin: true
    }
  })
  console.log('what is isAdmin: ', isAdmin)
  const adminId = isAdmin[0].dataValues.id

  if (userId === adminId) {
    return true
  } else {
    return false
  }
}
