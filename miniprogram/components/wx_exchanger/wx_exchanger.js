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
    inputValue: '',
  },
  lifetimes: {
    attached: function () {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindKeyInput(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    exchange() {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
      })
      wx.cloud.callFunction({
        name: 'exchange',
        data: {
          code: this.data.inputValue
        },
        success: res => {
          if (res.result.data) {
            this.triggerEvent("exchangeSuccess", res.result.userInfo)
            wx.showToast({
              title: '兑换成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '兑换码无效',
              icon: 'error'
            })
          }
        },
        fail: error => {
          console.log(error)
          wx.showToast({
            title: '兑换失败',
            icon: 'error'
          })
        }
      })
    },
    close() {
      this.triggerEvent("closePopup")
    }
  }
})