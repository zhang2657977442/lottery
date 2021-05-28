//index.js
//获取应用实例
let animation = wx.createAnimation({
  duration: 2000,
  timingFunction: 'linear'
})

Page({
  data: {
    buttonStatus: false,
    rotate: 0, //度数
    turning: false, //是否点击
    phone: undefined,//电话
    prize: undefined, //奖品
    canLottery: false
  },
  //事件处理函数
  start: function() {
    let _this = this;
    let cat = 60;
    var currentPrize = ''
    if (!this.data.turning) {
      let rdm = 0; //随机度数
      rdm = Math.floor(Math.random() * 3600); //最大10圈
      //rdm = 1200;//直接确定转的度数
      animation.rotate(rdm).step();
      this.setData({
        rotate: animation.export(),
        turning: true
      });
      setTimeout(() => {
        this.setData({
          turning: false
        });
        let num = rdm % 360; //转了多少度
        //console.log(num);
        function showModal(str) {
          wx.showModal({
            title: '提示',
            content: str,
            success: function() { //点击确定后还原到0度
              let animation = wx.createAnimation({
                duration: 100,
                timingFunction: 'linear'
              });
              animation.rotate(0).step();
              _this.setData({
                rotate: animation.export(),
                turning: false
              });
            },
            fail: function(res) {
              console.log(res)
            }
          })
        }
        if (num <= cat * 0.5 && num >= cat * 5.5) {
          showModal('谢谢参与');
          currentPrize = '谢谢参与';
          _this.recordPrize(currentPrize);
        } else if (num <= cat * 1.5 && num >= cat * 0.5) {
          showModal('一等奖');
          currentPrize = '一等奖';
          _this.recordPrize(currentPrize);
        } else if (num <= cat * 2.5 && num >= cat * 1.5) {
          showModal('三等奖');
          currentPrize = '三等奖';
          _this.recordPrize(currentPrize);
        } else if (num <= cat * 3.5 && num >= cat * 2.5) {
          showModal('优秀奖');
          currentPrize = '优秀奖';
          _this.recordPrize(currentPrize);
        } else if (num <= cat * 4.5 && num >= cat * 3.5) {
          showModal('欢迎再来');
          currentPrize = '欢迎再来';
          _this.recordPrize(currentPrize);
        } else if (num <= cat * 5.5 && num >= cat * 4.5) {
          showModal('二等奖');
          currentPrize = '二等奖';
          _this.recordPrize(currentPrize);
        }
      }, 2000)
    }
    

  },
  onLoad: function(options) {
    this.setData({
      phone: options.phone
    });
  },
  recordPrize: function(prize) {
    wx.cloud.callFunction({
      name: 'lottery',
      data: {phone: this.data.phone, prize: prize},
      success: res=>{
        console.log(res.result)
        
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
  checkLotteryNum: function() {
    this.setData({
      buttonStatus: true
    })
    wx.cloud.callFunction({
      name: 'checkLotteryNum',
      data: {phone: this.data.phone},
      success: res=>{
        if(res.result.errno===200){
          this.start()
          this.setData({
            canLottery: true,
            buttonStatus: false
          });
        }else{
          this.setData({
            canLottery: false,
            buttonStatus: false
          });
          wx.showModal({
            title: '提示',
            content: res.result.message,
            success(res) {
            }
          })
        }
        
      },
      fail: err=>{
        this.setData({
          canLottery: false,
          buttonStatus: false
        });
        wx.showModal({
          title: '提示',
          content: '调用程序失败！',
          success(res) {
          }
        })
      }
    })
  },
  gotoShareImage: function() {
    wx.navigateTo({
      url: '../share-image/index?text=' + 'a' + '&title=' + 'b',
    })
  }

})