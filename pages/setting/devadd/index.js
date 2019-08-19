// pages/setting/devadd/index.js
var aip = getApp().globalData.aip;
var screenHeight = getApp().globalData.screenHeight;
var width = getApp().globalData.screenWidth - 40;
var devadd_URL = getApp().globalData.devadd_URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var psnid = options.psnid;
    this.setData({
      psninfo: getApp().globalData.psninfo
    });
    console.log("devedit:onLoad");
    var data = { aip: aip, psnid: psnid };
    console.log(devadd_URL, data);
    that.requestData(devadd_URL, data);    
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

  requestData: function (url, data) {
    var that = this;
    wx.showLoading({
      title: '登录中...',
      icon: "loading",
      duration: 10000
    })
    wx.request({
      url: url,
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: data,
      success: function (res) {
        console.log(res.data.Dev);
        wx.hideLoading();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
        that.setData({
          psn: res.data.Dev.ret.psn,
        })
      },
      fail: function (res) {
      }
    })
  },

  bindFormSubmit: function (e) {
    var that = this;
    var flag = e.detail.value.flag;
    var sn = e.detail.value.sn;
    var devid = that.data.dev.devid;
    var psnid = that.data.dev.psn;
    console.log("bindFormSubmit");
    console.log(flag);
    console.log(sn);
    console.log(devid);
    console.log(psnid);
    var data = { devid: devid, aip: aip, psnid: psnid, sn: sn};
    console.log(devedit_URL, data)
    //that.requestData2(devedit_URL, data);
    var options = { devid: devid, psnid: psnid };
    that.onLoad(options);
  },
  
  requestData2: function (url, data) {
    var that = this;
    wx.showLoading({
      title: '登录中...',
      icon: "loading",
      duration: 10000
    })
    wx.request({
      url: url,
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: data,
      success: function (res) {
        console.log(res.data.Dev);
        wx.hideLoading();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
        that.setData({
          dev: res.data.Dev.ret,
        })
      },
      fail: function (res) {
      }
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