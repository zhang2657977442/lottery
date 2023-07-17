// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isEcShow: false,
    prizeList: [],
    recordId: "",
    isDialogShow: false,
    isAdressShow: false,
    lotterying: false,
    selectIndex: -1,
    activeIndex: -1,
    lotteryIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPrizeList()
  },


  login(e) {
    app.globalData.userInfo = e.detail
    this.setData({
      userInfo: e.detail
    })
    wx.cloud.database().collection('user').add({
      data: {
        userInfo: {
          ...e.detail,
          lotteryNum: 0
        },
      },
      success: res => {
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
      }
    })
  },
  getUserInfo() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  OpenEc() {
    this.setData({
      isEcShow: true
    })
  },
  exchangeSuccess(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.getUserInfo()
    this.setData({
      isEcShow: false
    })
  },
  closePopup() {
    this.setData({
      isEcShow: false
    })
  },
  toRecord() {
    wx.navigateTo({
      url: '/pages/record/index'
    })
  },
  getPrizeList() {
    wx.cloud.database().collection('prize').get({
      success: res => {
        this.setData({
          prizeList: res.data
        })
        console.log(this.data.prizeList)
      },
    })
  },
  closeDialog() {
    this.setData({
      isDialogShow: false
    })
  },

  async getLotteryResult() {
    wx.cloud.database().collection('prize').get({
      success: res => {
        console.log(res.data)
        const arr = res.data.filter((item) => item.inventory > 0 || item.inventory === -1) // 过滤掉没有库存的奖品
        let leng = 0;
        for (let i = 0; i < arr.length; i++) {
          leng += arr[i].odds //获取总数
        }
        for (let i = 0; i < arr.length; i++) {
          let random = Math.random() * leng; //获取 0-总数 之间的一个随随机整数
          if (random < arr[i].odds) {
            this.setData({

              lotteryIndex: i
            })
            console.log(arr[i].name, this.data.lotteryIndex)
            this.startAnimation()
            this.updatePrizeNum(this.data.lotteryIndex)
            this.addLotteryRecord(this.data.lotteryIndex)

            //如何抽到现金，执行微信支付操作
            if (arr[i].type === 'cash') {
              this.wxPayment(arr[i].cash)
            }
            return
          } else {
            leng -= arr[i].odds //否则减去当前的概率范围,进入下一轮循环
          }
        }
      },
    })

  },
  startLottery() {
    if (this.data.userInfo.lotteryNum > 0 && !this.data.lotterying) {
      this.resetData()
      console.log('开始抽奖')
      this.getLotteryResult()
      this.updateUserInfo()
    } else if (this.data.userInfo.lotteryNum === 0) {
      wx.showToast({
        title: '您没有抽奖次数',
        icon: 'error'
      })
    } else {
      wx.showToast({
        title: '正在抽奖中',
        icon: 'error'
      })
    }
  },
  startAnimation() {
    const timer = setInterval(() => {
      this.setData({
        activeIndex: this.data.activeIndex + 1
      })
      if (this.data.activeIndex === this.data.lotteryIndex + 8 * 2) {
        clearInterval(timer)
        setTimeout(() => {
          this.setData({
            selectIndex: this.data.lotteryIndex,
            activeIndex: -1,
            isDialogShow: true,
            lotterying: false,
          })
        }, 500)
      }
    }, 200)

  },
  resetData() {
    this.setData({
      selectIndex: -1,
      activeIndex: -1,
      lotteryIndex: -1,
      lotterying: true,
    })
  },
  addLotteryRecord(index) {
    wx.cloud.database().collection('lottery_record').add({
      data: {
        name: this.data.prizeList[index].name,
        type: this.data.prizeList[index].type,
        createTime: new Date()
      },
      success: (res) => {
        this.setData({
          recordId: res._id
        })
      }
    })
  },
  updateUserInfo() {
    const _ = wx.cloud.database().command
    wx.cloud.database().collection('user').where({
      _openid: app.globalData.user_openid
    }).update({
      data: {
        userInfo: {
          lotteryNum: _.inc(-1)
        }
      },
      success: () => {
        this.setData({
          ['userInfo.lotteryNum']: this.data.userInfo.lotteryNum - 1
        })
      }
    })
  },
  updatePrizeNum(index) {
    if (this.data.prizeList[index].inventory !== -1) {
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('prize').where({
        index: index
      }).update({
        data: {
          inventory: _.inc(-1)
        },
        success: (res) => {
          console.log(res)
        }
      })
    }
  },
  completeAddress() {
    this.setData({
      isDialogShow: false,
      isAdressShow: true
    })
  },
  submitSuccess() {
    this.setData({
      isAdressShow: false
    })
  },
  wxPayment(cash) {
    // 对接微信支付
    console.log(cash)
  }
})