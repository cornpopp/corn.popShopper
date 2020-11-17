const User = require('../server/db/models/user')

module.exports = async function(userId) {
  const isAdmin = await User.findAll({
    where: {
      isAdmin: true
    }
  })

  const adminId = isAdmin[0].user.dataValues.id
  console.log('userId: ', userId)

  if (userId === adminId) {
    return true
  } else {
    return false
  }
}
