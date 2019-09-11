// pages/setting/devedit/index.js
var aip = getApp().globalData.aip;
var screenHeight = getApp().globalData.screenHeight;
var width = getApp().globalData.screenWidth - 40;
var devedit_URL = getApp().globalData.devedit_URL;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sn:0,
    flag:false,
    dev:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var devid = options.devid;
    var psnid = options.psnid;
    this.setData({
      psninfo: getApp().globalData.psninfo,
      devid:  devid,
      psnid:  psnid
    });
    console.log("devedit:onLoad");
    console.log(devid);
  },

  requestData: function (url, data) {
    var that = this;
    wx.showLoading({
      title: '查询中...',
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
          dev: res.data.Dev.ret.dev,
          flag: res.data.Dev.ret.dev.flag
        })
      },
      fail: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
      }
    })
  },

  flagChange: function (e) {
    var that = this;
    var flag = e.detail.value;
    if (flag){
      that.setData({
        flag: 1,
      })
    }else{
      that.setData({
        flag: 0,
      })
    }

    console.log(that.data.flag);
  },
  
  bindFormSubmit: function (e) {
    var that = this;
    var sn = e.detail.value.sn;
    var devid = that.data.dev.devid;
    var psnid = that.data.dev.psn;
    var flag = that.data.flag;
    var shed = e.detail.value.shed;
    console.log("bindFormSubmit");
    console.log(flag);
    console.log(sn);
    console.log(devid);
    console.log(psnid);

    var data = { devid: devid, aip: aip, psnid: psnid ,sn:sn,flag:flag,shed:shed};
    console.log(devedit_URL, data)
    that.requestData2(devedit_URL, data);
  },

  requestData2: function (url, data) {
    var that = this;
    wx.showLoading({
      title: '查询中...',
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
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        });
        var options = { devid: that.data.dev.devid, psnid: that.data.dev.psn };
        that.onLoad(options);
      },
      fail: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 2000
        });
        var options = { devid: that.data.dev.devid, psnid: that.data.dev.psn };
        that.onLoad(options);
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
    var that = this;
    var data = { devid: that.data.devid, aip: aip, psnid: that.data.psnid };
    console.log(devedit_URL, data)
    that.requestData(devedit_URL, data);
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