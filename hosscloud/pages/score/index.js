
const app = getApp();
var api = require('../../api.js');
var aes = require('../../static/aes/aesUtil.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr: [1, 2, 3, 4, 5],
    index1: 5,
    index2: 5,
    index3: 5,
    index4: 5,
    repairurl: null,
    orderno: null,
    projectname: null,
    createdt: null,
    descs: null,
  },
  onLoad: function(e){
    this.setData({
      repairurl: wx.getStorageSync('repairurl'),
      orderno: wx.getStorageSync('orderno'),
      projectname: wx.getStorageSync('projectname'),
      createdt: wx.getStorageSync('createdt')
    })
  },
  searchdescs: function (e) {
    // console.log(e.detail.value)
    this.setData({ descs: e.detail.value });
  },
  toEvaluate: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({ index1: index});
  },
  toEvaluate2: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({ index2: index });
  },
  toEvaluate3: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({ index3: index });
  },
  toEvaluate4: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({ index4: index });
  },
  submit: function(){
    let data = {
      "orderNo": this.data.orderno,
      "repairScore": this.data.index1,
      "serviceScore": this.data.index2,
      "qualityScore": this.data.index3,
      "numberScore": this.data.index4,
      "descs": this.data.descs
    }
    console.log(data)
    if (!this.data.descs) {
      wx.showModal({
        title: '错误',
        content: '请输入评价内容',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    } else {
      wx.request({
        url: api.api.basePath + api.api.repiarPoint, //接口地址
        method: "POST",
        data: JSON.stringify(data).encode(),
        header: {
          'content-type': 'application/json', // 默认值
          'token': wx.getStorageSync('token')
        },
        success: res => {
          console.log(res.data)
          if (res.data.status == 200) {
            // wx.navigateBack({ changed: true });
            wx.showToast({
              title: '评价成功',
              icon: 'success',
              duration: 1000,
              success: function (res) {
                setTimeout(function () {
                  wx.navigateBack({ changed: true })
                }, 1000)
              }
            })
          } else {
            wx.showModal({
              title: '错误',
              content: '评价失败' + res.data.message,
              showCancel: false, //不显示取消按钮
              confirmText: '确定'
            })
          }
        },
        fail: res => {
          console.log(res)
        }
      })
    }
  }
})