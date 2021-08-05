/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-05 15:43:33
 * 省份
 */
const City = require('../models/citys')
const Province = require('../models/provinces')
const { returnCtxBody } = require('../utils/index')

class ProvinceCtl {
  // 获取省市级联数据
  async getCascader(ctx) {
    const arr = []
    const province = await Province.findAll()
    const city = await City.findAll()
    province.forEach(item => {
      arr.push({
        id: item.id,
        name: item.province,
        children: []
      })
    })
    arr.map(x => {
      city.map(y => {
        if (x.id === y.province_id) {
          x.children.push({
            id: y.id,
            name: y.city,
            parent_id: y.province_id
          })
        }
      })
    })
    ctx.body = returnCtxBody({
      data: {
        records: arr
      },
    })
  }
}

module.exports = new ProvinceCtl()
