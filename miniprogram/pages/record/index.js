// pages/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: ['']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getRecordList()
  },

  getRecordList() {
    wx.cloud.database().collection('lottery_record').get({
      success: res => {
        this.setData({
          recordList: res.data.map((item) => {
            return {
              name: item.name,
              createTime: this.formatTime(item.createTime)
            }
          })
        })
      },
    })
  },
  formatTime(date) {
    var year1 = date.getFullYear()
    // 注意取得的月份为0-11，所以要加1
    var month1 = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    // 注意天的取得，是getDate()，而不是getDay()
    var day1 = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hour1 = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minute1 = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var second1 = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // 拼接年月日时分秒：yyyy-MM-dd HH:mm:ss
    return year1 + '-' + month1 + '-' + day1 + ' ' + hour1 + ':' + minute1 + ':' + second1
  },

})