// pages/index/index.js
var screenHeight = getApp().globalData.screenHeight;
var width = getApp().globalData.screenWidth - 40;
var home_URL = getApp().globalData.home_URL;
var aip = getApp().globalData.aip;
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["温度异常", "治疗中", "低温异常"],
    subTitles: ["高温数量", "治疗数量", "低温数量"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    screenHeight: screenHeight,
    width: width,
    devcount: 0,
    envtemp1:null,
    envtemp2:null,
    devlist1:[],
    devlist2:[],
    devlist3:[],
    subTitle:null,
    TabCur: 0,
    scrollLeft: 0
  },

  tabSelect(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.id,
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id==2){

    }
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

    wx.getStorage({
      key: 'enduser',
      success: function (res) {
        console.log(res.data)
        var data = { userid: res.data.autoid, aip: aip};
        console.log(home_URL, data)
        that.requestData(home_URL, data);
        //that.requestValueData();

        setTimeout(function () {

          //that.requestAdData();

        }
          , 100)


      },
      fail: function (res) {
        wx.reLaunch({
          url: '../login/login'
        })
        wx.clearStorage()


      },

    })
  },

  requestData: function (url, data) {
    var that = this
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
        console.log(res.data.Dev.ret);
        wx.hideLoading();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
        that.setData({
          devcount: res.data.Dev.ret.devcount,
          devlist1: res.data.Dev.ret.devs.dev1,
          devlist2: res.data.Dev.ret.devs.dev2,
          devlist3: res.data.Dev.ret.devs.dev3,
          envtemp1: res.data.Dev.ret.temp.temp1,
          envtemp2: res.data.Dev.ret.temp.temp2,
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
    wx.showNavigationBarLoading();
    this.requestAdData();
    this.requestValueData();
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

  touchstart: function (e) {

    this.touchStartTime = e.timeStamp

  },
  touchend: function (e) {

    this.touchEndTime = e.timeStamp
  },

  bindscrolltolower: function (res) {
  },

  tapMessage: function (event) {
    console.log(event.target.id);       // 可获得
    console.log(event.target.name);     // 无法获得, 通过target只能直接获取id
    console.log(event.target.dataset);  // 要获得其它属性, 需要从dataset(数据集)中获取
    console.log(event.target.dataset.userxxx);  // userxxx为自定义的属性名, 但命名方式为:data-userxxx

    // 这里还原使用userXxx
    console.log(event.target.dataset.userXxx);
  }
})