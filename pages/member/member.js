// pages/member/member.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    topnav:'Me',
    loveid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // if (!app.globalData.islogin){
    //   wx.redirectTo({//关闭当前页面，跳转到应用内的某个页面
    //     url: '../login/login'
    //   })
    // }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        //此处为获取微信信息后的业务方法
      },
      fail: function () {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../tologin/tologin',
              })
            }
          }
        })
      }
    })
    this.getuser();
  },
  getuser: function (){
    var openid = wx.getStorageSync('openid')
    var that = this
    wx.request({
      url: app.globalData.dataurl + '/member/myinfo', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        openid: openid,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        console.log(res.data)
        wx.setStorageSync('loveid', res.data.u_loveid)
        that.setData({
          loveid: res.data.u_loveid
        })
      }
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  getinfo:function(e){
    wx.request({
      url: app.globalData.dataurl + '/member/mylove', //仅为示例，并非真实的接口地址
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var loveid = wx.getStorageSync('loveid')
    console.log(wx.getStorageSync('openid'))
    console.log(11+loveid)
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
      loveid: loveid
    })
  },
  myewm: function(){
    wx.navigateTo({
      url: '../myewm/myewm',
    })
  },
  gotoback: function () {
    wx.navigateTo({
      url: '../backed/backed',
    })
  },
  myinfo:function(){
    wx.navigateTo({
      url: '../myinfo/myinfo',
    })
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