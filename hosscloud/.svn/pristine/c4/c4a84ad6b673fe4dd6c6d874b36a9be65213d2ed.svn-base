//路径根据自己项目路径修改
var ias = require("../../api.js")
var aes = require("../../static/aes/aesUtil.js");

Page({
  data: {
    defaultNO:0,
    repairProject: null,
    categoryID:null
  
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
        this.setData({
          categoryID: options.id,
          repairProject: wx.getStorageSync('repairProject')
        })
  },
  /**
   * init 初始化函数
   */
  onReady: function (res) {
    // this.getRepairProject();
  },
  /**
   * 选择类别
   */
  selectCategory: function (e){
    wx.setStorageSync('category', e.currentTarget.dataset.category)
    wx.setStorageSync('typeId', e.currentTarget.id);
    this.setData({
      defaultNO: e.target.id
    })
  },
  /**
   * 提交
   */
  submitCategory: function (e) {
    wx.redirectTo({
      url: './index'
    })
  }
  
});

