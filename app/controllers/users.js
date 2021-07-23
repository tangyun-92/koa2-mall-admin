const User = require('../models/users')

class UserCtl {
  // 获取用户列表
  async find(ctx) {
    ctx.body = await User.findAll({
      where: {
        is_deleted: 0
      },
      attributes: { exclude: ['password'] },
    })
  }
}

module.exports = new UserCtl()
