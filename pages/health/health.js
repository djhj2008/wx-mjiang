import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height,num,days) {
  const chart = echarts.init(canvas, "macarons", {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    legend: {
      data: ['体温']
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: days,
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }, {
      start: 0,
      end: 100,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }],
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}°C'
      },
      min: 36,
      max: 42,
    },
    series: [
      {
        name: '体温',
        type: 'line',
        data: num,
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }

      }
    ]
  };

  chart.setOption(option);
  return chart;
}

// pages/index/index.js
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
    that.setData({
      ec: {
        days: ['04-01 12:00', '04-01 13:00', '04-01 14:00', '04-01 15:00', '04-01 16:00', '04-01 17:00', '04-01 18:00',],
        num: [41, 38, 39, 38, 38, 38, 37],
        onInit: initChart
      }
    });
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