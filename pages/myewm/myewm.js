// pages/myewm/myewm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topnav: '爱之码',
    openid:'',
    modalFlag : false,
    ewm:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = this.openid = wx.getStorageSync('openid')
    var sessionid = wx.getStorageSync('sessionid')
    console.log(sessionid);
    var that = this
    wx.request({
      url: app.globalData.dataurl + '/member/myewm', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        openid: openid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': sessionid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          ewm: res.data.path
        })
      }
    })
    this.setData({
      BaseUrl: app.globalData.dataurl
    })
  },
  dosys:function(){
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        if(!res.result){
          return false;
        }else{
          that.entercode(res.result)
        }
      }
    })
  },
  entercode: function (result){
    var openid = wx.getStorageSync('openid')
    wx.showModal({
      title: '提示',
      content: '确定与她（他）关联吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.dataurl + '/member/scancode', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
              result: result,
              openid: openid
            },
            header: {
              'content-type': 'application/json', // 默认值
            },
            success: function (res) {
              console.log(res.data)
              var info = {
                title: res.data.msg,
                duration: 2000
              }
              if (res.data.code){
                info.icon = 'success'
              }else{
                info.icon = 'loading'
              }
              wx.showToast(info)
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
              },2000)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
  
  }
})