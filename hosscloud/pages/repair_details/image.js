Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: null,
    images:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: wx.getStorageSync('imageurl')
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
  imageLoad: function (e) {
    console.log(e)
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
    console.log(this.data.images)
  }


})