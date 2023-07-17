const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    recordId: {
      type: String
    },
  },


  /**
   * 组件的初始数据
   */
  data: {
    address: {
      name: "",
      mobile: "",
      region: ['省', '市', '区'],
      detail: ""
    },
  },
  lifetimes: {
    attached: function () {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindNameInput: function (e) {
      this.setData({
        ['address.name']: e.detail.value
      })
    },
    bindMobileInput(e) {
      this.setData({
        ['address.mobile']: e.detail.value
      })
    },
    bindRegionChange(e) {
      this.setData({
        ['address.region']: e.detail.value
      })
    },
    bindDetailInput(e) {
      this.setData({
        ['address.detail']: e.detail.value
      })
    },
    submit() {
      wx.cloud.database().collection('lottery_record').where({
        _id: this.data.recordId
      }).update({
        data: {
          address: this.data.address
        },
        success: () => {
          this.triggerEvent("submitSuccess")
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  }
})