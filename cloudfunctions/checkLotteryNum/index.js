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
  const phone = event.phone
  const result = await db.collection('user').where({
    phone: _.eq(phone)
  }).get()
  if(result.data.length>0&&result.data[0].lottery_num>=3){
    return {
      errno: -1,
      message: "该手机号抽奖次数已满！"
    }
  }
  return {
    errno: 200,
    message: "可以抽奖！"
  }
}