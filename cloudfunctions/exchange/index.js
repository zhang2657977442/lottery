// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event) => {
  const _ = db.command
  const wxContext = cloud.getWXContext()
  let userInfo = null
  let flag = true
  const res = await db.collection('exchange_code').where({
    value: event.code
  }).get()
  if (res.data[0]) {
    // 删除code
    await db.collection('exchange_code').doc(res.data[0]._id).remove()

    // 给用户增加抽奖次数
    await db.collection('user').where({
      _openid: wxContext.OPENID
    }).update({
      data: {
        userInfo: {
          lotteryNum: _.inc(3)
        }
      },
    })

    const user = await db.collection('user').where({
      _openid: wxContext.OPENID
    }).get()

    if (user.data[0]) {
      userInfo = user.data[0]
    }
  } else {
    flag = false
  }

  return {
    errno: 200,
    message: "操作成功",
    data: flag,
    userInfo: userInfo
  }
}