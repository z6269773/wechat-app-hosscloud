//index.js
//获取应用实例
const app = getApp();
var api = require('../../api.js');
var aes = require('../../static/aes/aesUtil.js');

Page({
  data: {
    pointDetail: null,
    sueDetail: null
  },
  
  onLoad: function () {
    let data = {
      "orderId": wx.getStorageSync('repairid')
    }
    wx.request({
      url: api.api.basePath + api.api.pointDetail, //接口地址
      method: "POST",
      data: JSON.stringify(data).encode(),
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success: res => {
        if (res.data.status == 200) {
          console.log(res.data.results)
          this.setData({
            pointDetail: res.data.results
          });
        } else {
          console.log(res.data)
        }
      },
      fail: res => {
        console.log(res)
      }
    })

    wx.request({
      url: api.api.basePath + api.api.sueDetail, //接口地址
      method: "POST",
      data: JSON.stringify(data).encode(),
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success: res => {
        if (res.data.status == 200) {
          console.log(res.data.results)
          this.setData({
            sueDetail: res.data.results
          });
        } else {
          console.log(res.data)
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  }
   

   

})
