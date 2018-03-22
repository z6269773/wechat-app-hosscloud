const app = getApp();

Page({
  data: {
    list: null
  },
  /**
  * 监听页面开在加载的状态
  * 页面加载完成之后就不会在执行
  */
  onLoad: function () {
    var _that = this
    _that.setData({
      list: wx.getStorageSync('repairProject')
    })
    
  },
  
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].value == id) {
        list[i].selectable = !list[i].selectable
      } else {
        list[i].selectable = false
      }
    }
    this.setData({
      list: list
    });
  },
/**
 * 选择项目
 */
  okRepair: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
   
    prevPage.setData({
      project: e.currentTarget.dataset.project
    })
  },
  /**
  * 选择类别
  */
  selectCategory: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var strType = "allParams.typeId"
    prevPage.setData({
      category: e.currentTarget.dataset.category,
      [strType]: e.currentTarget.id
    })
    wx.navigateBack({ changed: true }); 
   
  },
 
});
