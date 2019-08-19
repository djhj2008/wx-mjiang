//app.js
App({
  onShow: function () {

  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.screenHeight = e.screenHeight;
        this.globalData.screenWidth = e.screenWidth;
      }
    });
    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res);
          wx.setStorageSync('code',res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    screenHeight: null,
    screenWidth: null,
    psninfo: null,
    aip: 'ios',
    login_URL: 'https://iot.xunrun.com.cn/pg/index.php/manager/login',
    home_URL: 'https://iot.xunrun.com.cn/pg/index.php/devselect/sickness',
    highset_URL: 'https://iot.xunrun.com.cn/pg/index.php/devselect/setting',
    cureset_URL: 'https://iot.xunrun.com.cn/pg/index.php/devselect/setting2',
    lowset_URL: 'https://iot.xunrun.com.cn/pg/index.php/devselect/setting3',
    todayvalue_URL: 'https://iot.xunrun.com.cn/pg/index.php/devselect/todayValue',
    devlist_URL:'https://iot.xunrun.com.cn/pg/index.php/add/devlistwx',
    devedit_URL: 'https://iot.xunrun.com.cn/pg/index.php/add/deveditwx',
    devadd_URL: 'https://iot.xunrun.com.cn/pg/index.php/add/devaddwx',
  }
})