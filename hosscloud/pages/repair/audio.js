
var ias = require("../../api.js")
var aes = require("../../static/aes/aesUtil.js");
const app = getApp();

// 微信小程序新录音接口，录出来的是aac或者mp3，这里要录成mp3
const mp3Recorder = wx.getRecorderManager()
const mp3RecoderOptions = {
  duration: 30000,
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 48000,
  format: 'mp3',
  //frameSize: 50
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: null,
    duration: null,
    curTimeVal: "00:00",
    flag: 0,
    down: true,
    choose: false,
    timers: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.chooseAudio()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  chooseAudio: function(){
    var that = this
    
    //onLoad中为录音接口注册两个回调函数，主要是onStop，拿到录音mp3文件的文件名（不用在意文件后辍是.dat还是.mp3，后辍不决定音频格式）
    mp3Recorder.onStart(() => {
      console.log('mp3Recorder.onStart()...')
    })
    mp3Recorder.onStop((res) => {
      console.log(res)
      that.setData({
        url: res.tempFilePath,
        duration: res.duration
      })
    })

  },

  agin: function () {
    this.audioCtx.pause()
    // this.chooseAudio()
    let _that=this

    _that.setData({
      choose: !_that.data.choose
    })
    if (_that.data.choose){
      mp3Recorder.start(mp3RecoderOptions);
      clearInterval(_that.timers)
      _that.setData({
        flag: 0
      })
      _that.timers = setInterval(_that.time, 1000)
    } else {
      mp3Recorder.stop();
      clearInterval(_that.timers)
      _that.setData({
        curTimeVal: "00:00",
        flag: 0
      })
    } 
  },

  time:function () {
    let _that = this
    let time = null;
    let flg = _that.data.flag + 1
    console.log(flg)
    _that.setData({
      flag: flg
    })
    if (_that.data.flag < 30) {
      time = _that.data.flag < 10 ? "00:0" + _that.data.flag : "00:" + _that.data.flag
    }else{
      clearInterval(_that.timers)
      time = "00:30"
    }
    _that.setData({
      curTimeVal: time
    })
  },

  sub: function () {
    // if (!this.data.url){
    //   mp3Recorder.stop();
    // }
    
    var tempFilePath = this.data.url,
      urls = ias.api.uploadFile;
  let that=this
    //上传语音
    // processFileUploadForMedia(urls, tempFilePath);
    let duration = this.data.duration

    let audioRepair = ias.api.basePath + ias.api.audioRepair

    if (this.data.down && tempFilePath){

    

    wx.uploadFile({
      url: ias.api.basePath + urls,
      filePath: tempFilePath,
      name: 'file',
      // formData: { "appKey": appkey, "appSecret": appsecret, "userId": UTIL.getUserUnique() },
      header: { 'content-type': 'multipart/form-data' },
      success: function (res) {
        console.log(JSON.parse(res.data));
        if (JSON.parse(res.data).status == 200) {
          // wx.navigateBack({ changed: true });
          let uploadId = JSON.parse(res.data).results.id
          let data = {
            "uploadId": uploadId,
            "ioLength": duration
          }
          wx.request({
            url: audioRepair, //接口地址
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
                  title: '报修成功',
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
                  content: '报修失败' + JSON.parse(res.data).message,
                  showCancel: false, //不显示取消按钮
                  confirmText: '确定'
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '错误',
            content: '报修失败' + JSON.parse(res.data).message,
            showCancel: false, //不显示取消按钮
            confirmText: '确定'
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: "网络请求失败，请确保网络是否正常",
          showCancel: false,
          success: function (res) {
          }
        });
      }
    });



    this.setData({
      down: false
    })
    
    }
    

  }



})


// //上传媒体文件
// function processFileUploadForMedia(urls, filePath) {
//   wx.uploadFile({
//     url: ias.api.basePath + urls,
//     filePath: filePath,
//     name: 'file',
//     // formData: { "appKey": appkey, "appSecret": appsecret, "userId": UTIL.getUserUnique() },
//     header: { 'content-type': 'multipart/form-data' },
//     success: function (res) {
//       console.log(JSON.parse(res.data));
//       if (JSON.parse(res.data).status == 200) {
//         // wx.navigateBack({ changed: true });
//         wx.showToast({
//           title: '报修成功',
//           icon: 'success',
//           duration: 1000,
//           success: function (res) {
//             setTimeout(function () {
//               wx.navigateBack({ changed: true })
//             }, 1000)
//           }
//         })
//       } else {
//         wx.showModal({
//           title: '错误',
//           content: '报修失败' + JSON.parse(res.data).message,
//           showCancel: false, //不显示取消按钮
//           confirmText: '确定'
//         })
//       }
//     },
//     fail: function (res) {
//       wx.showModal({
//         title: '提示',
//         content: "网络请求失败，请确保网络是否正常",
//         showCancel: false,
//         success: function (res) {
//         }
//       });
//     }
//   });
// }