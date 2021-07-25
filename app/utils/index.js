/*
 * @Author: 唐云
 * @Date: 2021-07-25 10:21:30
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-25 20:20:49
 */
/**
 * ctx.body返回的参数
 * @param {String} message 提示信息
 * @param {Array || Object} data 数据
 * @param {Number} status 状态码
 */
function returnCtxBody({
  message = '操作成功',
  data = null,
  total,
  status = 200,
}) {
  return {
    status,
    message,
    total,
    data,
  }
}

module.exports = {
  returnCtxBody,
}
