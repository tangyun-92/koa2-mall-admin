/*
 * @Author: 唐云
 * @Date: 2021-07-25 10:21:30
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-30 14:37:43
 */
const path = require('path')
const fs = require('fs')

/**
 * ctx.body返回的参数
 * @param {String} message 提示信息
 * @param {Array || Object} data 数据
 * @param {Number} status 状态码
 */
function returnCtxBody({
  message = '操作成功',
  data = null,
  status = 200,
  result = true
}) {
  return {
    status,
    message,
    data,
    result
  }
}

/**
 * 文件/图片上传
 * @param {*} ctx 
 * @param {*} savePath 保存的文件夹
 * @param {*} isMore 是否批量上传
 * @returns 图片保存的路径
 */
function fileUpload(ctx, savePath, isMore = false) {
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  const myDate = new Date()
  const newFileName = myDate.getTime() + '.' + file.name.split('.')[1]
  const filePath =
    path.join(__dirname, `../public/uploads/${savePath}`) + `/${newFileName}`
  const upStream = fs.createWriteStream(filePath)
  reader.pipe(upStream)
  return `http://${ctx.headers.host}/uploads/${savePath}/${newFileName}`
}

/**
 * 递归组装树数据
 * @param {*} arr 
 * @param {*} pid 
 * @returns 组装好的树结构
 */
function createTree(arr, pid = 0) {
  return arr
    .filter((v) => v.parent_id === pid)
    .map((v) => {
      v = JSON.parse(JSON.stringify(v))
      const children = createTree(arr, v.id)
      if (children.length) {
        v.children = createTree(arr, v.id)
      }
      return v
    })
}

module.exports = {
  returnCtxBody,
  fileUpload,
  createTree,
}
