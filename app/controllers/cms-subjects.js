/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-10-25 14:18:41
 * 专题
 */
const Subject = require('../models/cms-subjects')
const SubjectCategory = require('../models/cms-subject-category')
const { Op } = require('sequelize')
const { returnCtxBody, fileUpload, formData } = require('../utils/index')
const sequelize = require('sequelize')

class SubjectCtl {
  // 获取专题列表
  async find(ctx) {
    let {
      currentPage = 1,
      pageSize = 5,
      title = '',
      show_status = '',
      recommend_status = '',
      category_id = '',
    } = ctx.request.body
    currentPage = Math.max(currentPage, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Subject.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'DESC']],
      where: {
        title: {
          [Op.like]: `${title}%`,
        },
        show_status: {
          [Op.like]: show_status ? show_status : `%${show_status}%`,
        },
        category_id: {
          [Op.like]: category_id ? category_id : `%${category_id}%`,
        },
        recommend_status: {
          [Op.like]: recommend_status
            ? recommend_status
            : `%${recommend_status}%`,
        },
      },
      attributes: {
        include: [[sequelize.col('c.name'), 'subject_category_name']],
      },
      include: [
        {
          model: SubjectCategory,
          as: 'c',
          attribute: [],
        },
      ],
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

  // 获取专题map
  async findMap(ctx) {
    const { count, rows } = await Subject.findAndCountAll({
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

  // 获取专题分类列表
  async findSubjectCategory(ctx) {
    const { count, rows } = await SubjectCategory.findAndCountAll({
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

  // 专题图片上传
  async upload(ctx) {
    const url = fileUpload(ctx, 'subjects')
    ctx.body = {
      status: 200,
      result: true,
      message: '上传成功',
      url,
    }
  }

  // 创建/更新专题
  async update(ctx) {
    const { id, recommend_status, show_status } = ctx.request.body
    if (id) {
      const repeatedId = await Subject.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '专题不存在')
      }
      await Subject.update(
        {
          ...ctx.request.body,
        },
        { where: { id } }
      )
    } else {
      await Subject.create({
        ...ctx.request.body,
        create_time: formData(Date.now()),
      })
    }
    ctx.body = returnCtxBody({})
  }

  // 删除专题
  async delete(ctx) {
    const { id } = ctx.request.body
    await Subject.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new SubjectCtl()
