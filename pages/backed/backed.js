// pages/backed/backed.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topnav: 'Me',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  formReset:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    var data = e.detail.value
    if (!data.backcontent){
      wx.showToast({
        title: '请填写意见建议',
        duration: 1000,
        icon:'none'
      })
      return false;
    }
    wx.showToast({
      title: '提交成功',
      duration: 2000,
      icon: 'success'
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 2000)
    // data.openid = wx.getStorageSync('openid')
    // wx.request({
    //   url: app.globalData.dataurl + '/member/backed', //仅为示例，并非真实的接口地址
    //   method: "POST",
    //   data: data,
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
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