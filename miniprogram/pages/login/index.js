// pages/addOrEditUser/addOrEditUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleInfo: "填写手机号即可开始抽奖",
    phone: "",
    buttonStatus: false,
    prizeList: [],
    prizeVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addUser: function(){
    var that = this;
    var phone = that.data.phone;
    that.setData({
      buttonStatus: true
    })
    if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
      wx.showModal({
        title: '提示',
        content: '手机号填写有误！',
        success(res) {
          that.setData({
            buttonStatus: false
          })
        }
      })
    }else{
      wx.cloud.callFunction({
        name: 'login',
        data: {phone: that.data.phone},
        success: res=>{
          console.log(res.result)
          if(res.result.errno===200){
            that.setData({
              buttonStatus: false
            })
            wx.navigateTo({
              url: '../play/index?phone='+that.data.phone
            })
          }else{
            wx.showModal({
              title: '提示',
              content: res.result.message,
              success(res) {
                that.setData({
                  buttonStatus: false
                })
              }
            })
          }
        },
        fail: err=>{
          wx.showModal({
            title: '提示',
            content: '调用程序失败！',
            success(res) {
              that.setData({
                buttonStatus: false
              })
            }
          })
        }
      })
  }
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  seePrize:  function (e) {
    wx.cloud.callFunction({
      name: 'getPrizeList',
      data: {},
      success: res=>{
        console.log(res.result)
        if(res.result.errno===200){
          this.setData({
            prizeList: res.result.prizeList,
            prizeVisible: true
          });
        }
      },
      fail: err=>{
        wx.showModal({
          title: '提示',
          content: '调用程序失败！',
          success(res) {
          }
        })
      }
    })
  },
  handleClose1 () {
    this.setData({
      prizeVisible: false
    });
  }
})