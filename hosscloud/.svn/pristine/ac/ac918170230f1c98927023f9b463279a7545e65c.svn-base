//index.js
//获取应用实例
const app = getApp();
var api = require('../../api.js');
var aes = require('../../static/aes/aesUtil.js');

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    repairno: null,
    repairstatusname: null,
    serviceDetail: null
  },
  //事件处理函数
  
  onLoad: function () {
    this.setData({
      repairno: wx.getStorageSync('repairno'),
      repairstatusname: wx.getStorageSync('repairstatusname')
    });
    let data = {
      "repiarNo": wx.getStorageSync('repairno')
    }
    wx.request({
      url: api.api.basePath + api.api.serviceDetail, //接口地址
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
            serviceDetail: res.data.results
          });
        } else {
          console.log(res.data)
        }
      },
      fail: res => {
        console.log(res)
      }
    })

  },
  onReady: function(){
   
  },
  
  toaudio: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.setStorageSync('audiourl', url);
    wx.navigateTo({
      url: './audio',
    })
  },
  tovideo: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.setStorageSync('videourl', url);
    wx.navigateTo({
      url: './video',
    })
  },
  toimage: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.setStorageSync('imageurl', url);
    wx.navigateTo({
      url: './image',
    })
  }
 
})
