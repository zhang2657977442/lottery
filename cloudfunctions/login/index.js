// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
const db = cloud.database({
  env: 'test-env-0gcv9y0349c192c0'
})
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  console.log(context)
  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看
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
    }else if(result.data.length===0){
      await db.collection('user').add({
        data: {phone: phone,openid: wxContext.OPENID,lottery_num: 0,addtime: new Date()}
      })
  }
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息

  return {
    errno: 200,
    message: "可以抽奖！"
  }
}

