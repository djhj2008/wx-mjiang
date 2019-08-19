// pages/home/low/index.js
var aip = getApp().globalData.aip;
var lowset_URL = getApp().globalData.lowset_URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devid: 0,
    psnid: 0,
    temp1: 0,
    flag: 0,
    desclist: [],
    desc: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var devid = options.devid;
    var psnid = options.psnid;
    var temp1 = options.temp1;
    this.setData({
      devid: devid,
      psnid: psnid,
      temp1: temp1
    });
    this.setData({
      psninfo: getApp().globalData.psninfo
    });
    console.log(options);
  },

  bindFormSubmit: function (e) {
    var that = this;
    var flag = e.detail.value.flag;
    var desc = e.detail.value.textarea;
    var tem1 = that.data.temp1;
    console.log("bindFormSubmit");
    console.log(flag);
    console.log(desc);
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
    var that = this;
    var data = {
      psnid: that.data.psnid,
      devid: that.data.devid,
      aip: aip
    };
    console.log(lowset_URL, data)
    that.requestData(lowset_URL, data);
  },

  requestData: function (url, data) {
    var that = this
    wx.showLoading({
      title: '载入中...',
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
        console.log(res.data.Dev.ret);
        wx.hideLoading();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
        that.setData({
          desclist: res.data.Dev.ret.descs,
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