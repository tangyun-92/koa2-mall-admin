const User = require('../models/user')

class UserCtl {
  async find(ctx) {
    console.log(ctx)
    ctx.body = await User.findAll()
  }
}

module.exports = new UserCtl()