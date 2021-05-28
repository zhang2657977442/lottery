// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const wxContext = cloud.getWXContext()
const db = cloud.database({
  env: 'test-env-0gcv9y0349c192c0'
})
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('服务端打印的event',event)
  await db.collection('user').add({
    data: {phone: '13968952370',openid: wxContext.OPENID}
  })
}