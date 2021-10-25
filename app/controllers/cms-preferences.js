/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 15:17:20
 * 优选主题
 */
const Preference = require('../models/cms-preferences')
const { Op } = require('sequelize')
const { returnCtxBody, fileUpload, formData } = require('../utils/index')
const sequelize = require('sequelize')

class PreferenceCtl {
  // 获取优选主题列表
  async find(ctx) {
    let {
      currentPage = 1,
      pageSize = 5,
      name = '',
      show_status = ''
    } = ctx.request.body
    currentPage = Math.max(currentPage, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Preference.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'DESC']],
      where: {
        name: {
          [Op.like]: `${name}%`,
        },
        show_status: {
          [Op.like]: show_status ? show_status : `%${show_status}%`,
        },
      },
    })
    ctx.body = returnCtxBody({
      data: {
        records: rows,
        currentPage,
        pageSize,
        total: count,
      },
    })
  }

  // 获取优选主题map
  async findMap(ctx) {
    const { count, rows } = await Preference.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: ['id', 'name'],
    })
    ctx.body = returnCtxBody({
      data: {
        records: rows,
        total: count,
      },
    })
  }

  // 优选主题图片上传
  async upload(ctx) {
    const url = fileUpload(ctx, 'preferences')
    ctx.body = {
      status: 200,
      result: true,
      message: '上传成功',
      url,
    }
  }

  // 创建/更新优选主题
  async update(ctx) {
    const { id, recommend_status, show_status } = ctx.request.body
    if (id) {
      const repeatedId = await Preference.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '优选主题不存在')
      }
      await Preference.update(
        {
          ...ctx.request.body,
        },
        { where: { id } }
      )
    } else {
      await Preference.create({
        ...ctx.request.body,
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 删除优选主题
  async delete(ctx) {
    const { id } = ctx.request.body
    await Preference.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new PreferenceCtl()
