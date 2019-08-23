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
      psninfo: getApp().globalData.psninfo,
      psnid: psnid
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
      },
      fail: function (res) {
      }
    })
  },

  bindFormSubmit: function (e) {
    var that = this;
    var sn = e.detail.value.sn;
    var devid = e.detail.value.devid;
    var psnid = that.data.psnid;
    console.log("bindFormSubmit");
    console.log(sn);
    console.log(devid);
    console.log(psnid);
    var data = { devid: devid, aip: aip, psnid: psnid, sn: sn};
    console.log(devadd_URL, data)
    that.requestData2(devadd_URL, data);
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
        var ret_message = res.data.Dev.ret.ret_message
        if (ret_message =="success"){
          wx.showToast({
            title: '成功.',
            icon: 'success',
            duration: 2000
          });
        }else{
          wx.showToast({
            title: '失败,设备已存在.',
            icon: 'fail',
            duration: 2000
          });
        }
        //var options = {psnid: that.data.dev.psn };
        //that.onLoad(options);
      },
      fail: function (res) {
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 2000
        });
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