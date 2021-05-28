// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'test-env-0gcv9y0349c192c0'
})
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command
  const openid = wxContext.OPENID
  const result = await db.collection('lottery_record').where({
    openid: _.eq(openid)
  }).get()
  var prizeList = []
  if(result.data.length>0){
    prizeList = result.data
  }
  return {
    errno: 200,
    message: "查询成功",
    prizeList: prizeList
  }
}