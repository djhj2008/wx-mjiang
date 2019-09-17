var aip = getApp().globalData.aip;
var screenHeight = getApp().globalData.screenHeight;
var width = getApp().globalData.screenWidth - 40;
var home_URL = getApp().globalData.home_URL;
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psninfo:null,
    // 页面总高度将会放在这里
    windowHeight: 0,
    // navbar的高度
    navbarHeight: 0,
    // header的高度
    headerHeight: 0,
    // scroll-view的高度
    scrollViewHeight: 0,
    TabCur: 0,
    scrollLeft: 0,
    tabs: ["温度异常", "治疗中", "低温异常", "数据异常"],
    subTitles: ["高温数量", "治疗数量", "低温数量", "异常数量"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    screenHeight: screenHeight,
    width: width,
    devcount: 0,
    envtemp1: null,
    envtemp2: null,
    devlen:[],
    devlist1: [],
    devlist2: [],
    devlist3: [],
    devlist4: [],
    subTitle: null,
    scrollLeft: 0
  },

  tabSelect(e) {
    getApp().globalData.tabindex = e.currentTarget.dataset.id;
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 先取出页面高度 windowHeight
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
        console.log("windowHeight:" + res.windowHeight);
      }
    });
    // 算出来之后存到data对象里面
    this.setData({
      psninfo: getApp().globalData.psninfo
    });
    // 然后取出navbar和header的高度
    // 根据文档，先创建一个SelectorQuery对象实例
    let query = wx.createSelectorQuery().in(this);
    // 然后逐个取出navbar和header的节点信息
    // 选择器的语法与jQuery语法相同
    query.select('#navbar').boundingClientRect();
    query.select('#title1').boundingClientRect();
    query.select('#title2').boundingClientRect();
    query.select('#title3').boundingClientRect();
    query.select('#title4').boundingClientRect();
    query.select('#title5').boundingClientRect();
    query.select('#title6').boundingClientRect();
    query.select('#title7').boundingClientRect();

    // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
    query.exec((res) => {
      // 分别取出navbar和header的高度
      let navbarHeight = res[0].height;
      console.log(res);
      console.log("navbarHeight:" + navbarHeight);
      // 然后就是做个减法
      let scrollViewHeight = this.data.windowHeight - res[7].top- res[7].height;

      // 算出来之后存到data对象里面
      this.setData({
        scrollViewHeight: scrollViewHeight
      });
    });
  },

  highsetting: function(e){
    var dev = e.currentTarget.dataset.dev;
    console.log(dev);
    wx.navigateTo({
      url: '/pages/home/high/index?' + 'devid=' + dev.devid + '&psnid=' + dev.psnid + '&temp1=' + dev.temp1,
    })
  },

  curesetting: function (e) {
    var dev = e.currentTarget.dataset.dev;
    console.log(dev);
    wx.navigateTo({
      url: '/pages/home/cure/index?' + 'devid=' + dev.devid + '&psnid=' + dev.psnid + '&temp1=' + dev.temp1,
    })
  },

  lowsetting: function (e) {
    var dev = e.currentTarget.dataset.dev;
    console.log(dev);
    wx.navigateTo({
      url: '/pages/home/low/index?' + 'devid=' + dev.devid + '&psnid=' + dev.psnid + '&temp1=' + dev.temp1,
    })
  },

  lostsetting: function (e) {
    var dev = e.currentTarget.dataset.dev;
    console.log(dev);
    wx.navigateTo({
      url: '/pages/home/lost/index?' + 'devid=' + dev.devid + '&psnid=' + dev.psnid + '&temp1=' + dev.temp1,
    })
  },

  todayvalue: function (e) {
    var dev = e.currentTarget.dataset.dev;
    console.log(dev);
    wx.navigateTo({
      url: '/pages/home/todayvalue/index?' + 'devid=' + dev.devid + '&psnid=' + dev.psnid,
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
    var index = getApp().globalData.tabindex;
    console.log("onLoad index:" + index);
    if (index > 0) {
      this.setData({
        TabCur: index,
      })
    }

    wx.getStorage({
      key: 'enduser',
      success: function (res) {
        console.log(res.data)
        var data = { userid: res.data.autoid, aip: aip };
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
        console.log(res.data.Dev.ret);
        wx.hideLoading();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
        that.setData({
          devcount: res.data.Dev.ret.devcount,
          devlist1: res.data.Dev.ret.devs.dev1,
          devlist2: res.data.Dev.ret.devs.dev2,
          devlist3: res.data.Dev.ret.devs.dev3,
          devlist4: res.data.Dev.ret.devs.dev4,
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
    console.log("onPullDownRefresh");
    wx.stopPullDownRefresh();
    var that = this;
    var index = getApp().globalData.tabindex;
    console.log("onLoad index:" + index);
    if (index > 0) {
      this.setData({
        TabCur: index,
      })
    }

    wx.getStorage({
      key: 'enduser',
      success: function (res) {
        console.log(res.data)
        var data = { userid: res.data.autoid, aip: aip };
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})