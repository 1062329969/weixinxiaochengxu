//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    pages:1,
    infolist:null,
    BaseUrl:'',
    maxpage:0
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
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
    this.getlist();
    this.setData({
      BaseUrl: app.globalData.dataurl
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getlist: function(){
    var that = this
    var pages = this.data.pages
    console.log(pages)
    wx.request({
      url: app.globalData.dataurl + '/index/list', //仅为示例，并非真实的接口地址
      data: {
        page: pages,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          infolist:res.data.data,
          maxpage:res.data.last_page,
          pages: pages+1
        })
        console.log(res.data)
      }
    })
  },
  onReachBottom: function () {
    if (this.data.maxpage+1 == this.data.pages){
      return false; 
    }
    var that = this
    var pages = this.data.pages
    var infolist = that.data.infolist
    console.log(infolist)
    wx.request({
      url: app.globalData.dataurl + '/index/list', //仅为示例，并非真实的接口地址
      data: {
        page: pages,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        infolist = infolist.concat(res.data.data)
        that.setData({
          infolist: infolist,
          pages: pages + 1
        })
        console.log(infolist)
      }
    })
  },
})
