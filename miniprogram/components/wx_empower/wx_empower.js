const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {},


  /**
   * 组件的初始数据
   */
  data: {
    flag: false,
  },
  lifetimes: {
    attached: function () {
      wx.cloud.database().collection('user').where({
        _openid: app.globalData.user_openid
      }).get({
        success: res => {
          if (!res.data[0]) {
            this.setData({
              flag: true,
            })
          } else {
            app.globalData.userInfo = res.data[0].userInfo
            this.triggerEvent("getUserInfo")
          }
        },
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.triggerEvent("login", res.userInfo)
          this.setData({
            flag: false
          })
        }
      })
    },
  }
})