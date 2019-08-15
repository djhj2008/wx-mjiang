// pages/setting/setting.js
var aip = getApp().globalData.aip;
var screenHeight = getApp().globalData.screenHeight;
var width = getApp().globalData.screenWidth - 40;
var devlist_URL = getApp().globalData.devlist_URL;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    devlist:[],
    userid:0,
    username:null,
    searchflag:false,
    devid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'enduser',
      success: function (res) {
        console.log(res.data);
        that.setData({
          userid: res.data.autoid,
          username:res.data.name,
        });
        if (that.data.searchflag) {
          var data = { userid: that.data.userid, aip: aip ,devid:that.data.devid};
          console.log(devlist_URL, data)
          that.requestData(devlist_URL, data);
        }else{
          var data = { userid: that.data.userid, aip: aip };
          console.log(devlist_URL, data)
          that.requestData(devlist_URL, data);
        }
      },
      fail: function (res) {
        wx.clearStorage()
      },
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
          devlist: res.data.Dev.ret.devlist,
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

  },

  additem: function(){
    wx.navigateTo({
      url: '/pages/setting/devadd/index',
    })
  },

  edititem: function (e) {
    var dev = e.currentTarget.dataset.dev;
    wx.navigateTo({
      url: '/pages/setting/devedit/index?' + 'devid=' + dev.devid + '&psnid=' + dev.psn
    })
  },

  bindFormSubmit: function (e) {
    var that = this;
    var devid = e.detail.value.devid;
    if(devid!=""){
      console.log("bindFormSubmit");
      console.log(devid);
      that.setData({
        searchflag: true,
        devid: devid,
      })
      this.onLoad();
    }else{
      that.setData({
        searchflag: false,
      })
      this.onLoad();
    }

    /*
    that.setData({
      searchflag: true,
      devid: res.data.Dev.ret.devid,
    })
    this.onLoad();
    */
  },
})