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
  const prize = event.prize
  await db.collection('lottery_record').add({
    data: {phone: phone,openid: wxContext.OPENID,prize: prize,addtime: new Date()}
  })
  const result = await db.collection('user').where({
    phone: _.eq(phone)
  }).get()
  await db.collection('user').where({
    phone: _.eq(phone)
  }).update({
    data: {
      lottery_num: result.data[0].lottery_num+1
    },
    success: function(res) {
      console.log(res.data)
    }
  })
  
  return {
    errno: 200,
    message: "记录成功！"
  }
}