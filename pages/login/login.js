// pages/login/login.js
var screenHeight = getApp().globalData.screenHeight;
var width = getApp().globalData.screenWidth - 40;
var login_URL = getApp().globalData.login_URL;
var aip = getApp().globalData.aip;
var app = getApp();

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: screenHeight,
    width: width,
    phone: null,
    password: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //发起网络请求
    wx.getStorage({
      key: 'logininfo', 
      success: function (res) {
        console.log(res);
        that.setData({
          phone: res.data.name,
          password: res.data.pwd,
        })
      },
      fail:function(){
        that.setData({
          phone: "",
          password: "",
        })
      },
    })
  },

  phoneBindinput: function (res) {
    this.setData({
      phone: res.detail.value
    })
  },

  nameBindinput: function (res) {

    this.setData({
      password: res.detail.value
    })
  },

  loginAction: function () {
    var endusername = this.data.phone;
    var enduserpwd = this.data.password;
    if (endusername == "" || enduserpwd==""){
      wx.showToast({
        title: '请输入用户名密码.',
        icon: 'none',
        duration: 2000
      });
    }
    else{
      var data = { name: endusername, pwd: enduserpwd, aip: aip };
      console.log(login_URL, data)
      this.requestData(login_URL, data);
    }
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
        console.log(res.data.UserInfo)
        wx.hideLoading();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        var ret_message = res.data.UserInfo.ret.ret_message;

        if (ret_message === "success") {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
          getApp().globalData.psninfo = res.data.UserInfo.ret.data.info;
          console.log("psninfo:");
          console.log(getApp().globalData.psninfo);
          try {
            wx.setStorageSync('logininfo', data);
            wx.setStorageSync('enduser', res.data.UserInfo.ret.data);
          } catch (e) {
          }
          wx.reLaunch({
            url: '../home/home'
          })
        } else {
          wx.showToast({
            title: '登录失败',
            image: "../../images/home_icon_orange@3x.png",
            duration: 2000
          });
        };


      },

      fail: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.showToast({
          title: '请求失败',
          image: "../../images/home_icon_orange@3x.png",
          duration: 2000
        });
        console.log(res)
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