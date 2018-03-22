//路径根据自己项目路径修改
var ias = require("../../../api.js")
var aes = require("../../../static/aes/aesUtil.js");

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

// mp3Recorder.start(options)
Page({
  data: {
    curTimeVal:"00:00",
    isSpeaking: false,//是否正在说话
    flag:false,
  },
  /**
  * 监听页面开在加载的状态
  * 页面加载完成之后就不会在执行
  */
  onLoad: function () {
    var _that = this
    //onLoad中为录音接口注册两个回调函数，主要是onStop，拿到录音mp3文件的文件名（不用在意文件后辍是.dat还是.mp3，后辍不决定音频格式）
    mp3Recorder.onStart(() => {
      console.log('mp3Recorder.onStart()...')
    })
    mp3Recorder.onStop((res) => {
      console.log(res)
      var tempFilePath = res.tempFilePath,
          urls = ias.api.uploadFile;
      wx.setStorageSync('audioURL', tempFilePath);
      processFileUploadForMedia(urls, tempFilePath, _that);
    })
    
  },
  /**
  * 监听按下
  */
  touchdown: function () {
    var _this = this;
    let i = 0,time=null;
    let timer = setInterval(function () {
      if (_this.data.flag || i >30){
        clearInterval(timer) 
      }
      i++;
      console.log(i)
      if (parseInt(i) < 10) {
        time = "00:0" + i
      } else{
        time = "00:" + i
      }
      _this.setData({
        curTimeVal: time
      })

    }, 1000);
   
    this.setData({
      isSpeaking: true
    })
    mp3Recorder.start(mp3RecoderOptions);
  },
  /**
  * 监听手指移除
  */
  touchup: function () {
    console.log("mp3Recorder.stop")
    this.setData({
      isSpeaking: false,
      flag:true
    })
    mp3Recorder.stop();
   
  },
 
});
//上传媒体文件
function processFileUploadForMedia(urls, filePath, _this) {
  wx.uploadFile({
    url: ias.api.basePath + urls,
    filePath: filePath,
    name: 'file',
    // formData: { "appKey": appkey, "appSecret": appsecret, "userId": UTIL.getUserUnique() },
    header: { 'content-type': 'multipart/form-data' },
    success: function (res) {
      console.log(res)
      console.log("add audio")
      wx.navigateBack({ changed: true });
      var resAll = JSON.parse(res.data).results;
      var resID = resAll.id,
        typeID = resAll.type;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      prevPage.data.audioID.push(resID);
      prevPage.setData({
        audioURL: filePath
      })
    },
    fail: function (res) {
      wx.showModal({
        title: '提示',
        content: "网络请求失败，请确保网络是否正常",
        showCancel: false,
        success: function (res) {
        }
      });
      wx.hideToast();
    }
  });
}