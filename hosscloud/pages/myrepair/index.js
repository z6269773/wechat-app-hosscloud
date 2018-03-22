
const app = getApp();
var api = require('../../api.js');
var aes = require('../../static/aes/aesUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid:null,
    indexs: null,
    loadingMore: false,
    loadingMorerow: false,
    pageNumber:1,
    pageSize:10,
    list:[]
  },
  onShow: function (options){
    this.updateShow()
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
    // console.log(app.globalData.token)
    // aes加密
    // let data={
    //   "phone": 15212345654
    // }
    // console.log(JSON.stringify(data).encode());
  },
  
  //下拉请求数据
  scrollLowerEvent: function (e) {
    this.setData({
      pageNumber: this.data.pageNumber + 1
    });
    if (!this.data.loadingMore){
      wx.request({
        url: api.api.basePath + api.api.myList + "?pageNumber=" + this.data.pageNumber + "&pageSize=" + this.data.pageSize, //接口地址
        header: {
          'content-type': 'application/json', // 默认值
          'token': wx.getStorageSync('token')
        },
        method: "POST",
        success: res => {
          console.log(res.data.results.rows)
          if (res.data.results.rows.length > 0){
            this.setData({
              loadingMore: false,
              list: this.data.list.concat(res.data.results.rows)
            });
          }else{
            this.setData({
              loadingMore: false,
              loadingMorerow: true
            });
          }
         
        },
        fail: res => {
          console.log(res)
        }
      })
    }
    
  },
  refesh: function (e) {
    this.updateShow()
  },

  toDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync('repairid', id)
    wx.navigateTo({
      url: '../b_repair_details/index',
    })
  },

  toEvaluate: function (e) {
    let id = e.currentTarget.dataset.id;
    let repairurl = e.currentTarget.dataset.repairurl;
    let orderno = e.currentTarget.dataset.orderno;
    let projectname = e.currentTarget.dataset.projectname;
    let createdt = e.currentTarget.dataset.createdt;
    wx.setStorageSync('repairid', id)
    wx.setStorageSync('repairurl', repairurl)
    wx.setStorageSync('orderno', orderno)
    wx.setStorageSync('projectname', projectname)
    wx.setStorageSync('createdt', createdt)
    wx.navigateTo({
      url: '../evaluate/index',
    })
  },

  toScore: function (e) {
    let id = e.currentTarget.dataset.id;
    let repairurl = e.currentTarget.dataset.repairurl;
    let orderno = e.currentTarget.dataset.orderno;
    let projectname = e.currentTarget.dataset.projectname;
    let createdt = e.currentTarget.dataset.createdt;
    wx.setStorageSync('repairid', id)
    wx.setStorageSync('repairurl', repairurl)
    wx.setStorageSync('orderno', orderno)
    wx.setStorageSync('projectname', projectname)
    wx.setStorageSync('createdt', createdt)
    // wx.getStorageSync('token')//得到缓存
    // console.log(id, repairurl, orderno, projectname, createdt)
    wx.navigateTo({
      url: '../score/index',
    })
  },

  reMove: function (e) {
    // wx.showToast({
    //   title: '删除成功',
    //   icon: 'success',
    //   duration: 1000
    // })
    
    let index = e.currentTarget.dataset.index;
    let iid=e.target.id;
    this.setData({
      iid: iid,
      indexs: index
    }) 
    let data={
      "orderId": iid
    }
    let _this = this;
    // console.log(e, e.target.id, this.data.iid)
    wx.showModal({
      title: '',
      content: '确定删除这条报修?',
      showCancel: false, //不显示取消按钮
      confirmText: '确定',
      success:function(){
        wx.request({
          url: api.api.basePath + api.api.repiarDelete, //接口地址
          method: "POST",
          data: JSON.stringify(data).encode(),
          header: {
            'content-type': 'application/json', // 默认值
            'token': wx.getStorageSync('token')
          },
          success: res => {
            if (res.data.status == 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000,
                success: function (res) {
                  console.log(this)
                  setTimeout(function () {
                    _this.updateShow()
                  }, 1000)
                }
              })
            } else {
              wx.showModal({
                title: '错误',
                content: '删除失败' + res.data.message,
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
    })
  },


  reMove1: function (e) {
    // wx.showToast({
    //   title: '删除成功',
    //   icon: 'success',
    //   duration: 1000
    // })

    let index = e.currentTarget.dataset.index;
    let iid = e.target.id;
    this.setData({
      iid: iid,
      indexs: index
    })
    let data = {
      "orderId": iid
    }
    // console.log(e, e.target.id, this.data.iid)
    let _this=this;
    wx.showModal({
      title: '',
      content: '确定取消这条报修?',
      showCancel: false, //不显示取消按钮
      confirmText: '确定',
      success: function () {
        wx.request({
          url: api.api.basePath + api.api.repiarCancel, //接口地址
          method: "POST",
          data: JSON.stringify(data).encode(),
          header: {
            'content-type': 'application/json', // 默认值
            'token': wx.getStorageSync('token')
          },
          success: res => {
            if (res.data.status == 200) {
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 1000,
                success: function (res) {
                  console.log(this)
                  setTimeout(function () {
                    _this.updateShow()
                  }, 1000)
                }
              })
            } else {
              wx.showModal({
                title: '错误',
                content: '取消失败' + res.data.message,
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
    })
  },


  updateShow: function () {
    this.setData({
      pageNumber: 1
    });
    wx.request({
      url: api.api.basePath + api.api.myList + "?pageNumber=" + this.data.pageNumber + "&pageSize=" + this.data.pageSize, //接口地址
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      method: "POST",
      success: res => {
        console.log(res.data.results.rows)
        this.setData({
          list: res.data.results.rows
        });
      },
      fail: res => {
        console.log(res)
      }
    })
  }

})