// pages/tologin/tologin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  getUserInfo: function (e) {
    wx.login({
      success: res => {
        console.log(res)
        app.globalData.userInfo = e.detail.userInfo
        console.log(e)
        app.globalData.code = res.code
        wx.request({
          url: app.globalData.dataurl + '/adduser', //仅为示例，并非真实的接口地址
          data: {
            code: res.code,
            userinfo: e.detail.userInfo
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
          }
        })

        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
    
  }
})