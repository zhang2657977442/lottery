//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'lottery-1gfbj5gac0aac7b1',
        traceUser: true,
      })
    }
    //调用云函数
    wx.cloud.callFunction({
      name: 'getOpenId',
      success: res => {
        //获取用户openid
        this.globalData.user_openid = res.result.openid
        console.log(this.globalData.user_openid)
      }
    })
  },
  //全局数据
  globalData: {
    //用户openid
    user_openid: '',
    //用户信息
    userInfo: null
  }
})