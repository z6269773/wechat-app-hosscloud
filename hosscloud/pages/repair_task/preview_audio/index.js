//路径根据自己项目路径修改
var ias = require("../../../api.js")
var aes = require("../../../static/aes/aesUtil.js");

const app = getApp();
const innerAudioContext = wx.createInnerAudioContext();

// innerAudioContext.autoplay = true

innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

// mp3Recorder.start(options)
Page({
  data: {
    curTimeVal: "00:00",
    isSpeaking: false,//是否正在说话
    play: true
  },
  /**
  * 监听页面开在加载的状态
  * 页面加载完成之后就不会在执行
  */
  onLoad: function (option) {
    var _that = this;
    innerAudioContext.src = wx.getStorageSync('audioURL');
    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    
    innerAudioContext.onPlay(() => {
      console.log('录音播放中');
      _that.updateTime(_that)
    })

    innerAudioContext.onStop(() => {
      console.log('录音播放停止');

    })

    innerAudioContext.onEnded(() => {
      console.log('录音播放结束');
      _that.setStopState(_that)
      
    })
   

  },
  onUnload: function (e){
    console.log("停止播放");
    innerAudioContext.stop()
  },
  play: function (e) {
    console.log("click BTN")
    var that = this;
    // debugger;
    if(that.data.play){
      innerAudioContext.play();
    }else{
      that.pause();
    }
    that.setData({
      play: !that.data.play
    });
    
  },
  // 暂停
  pause: function () {

    innerAudioContext.pause();

  },
  //更新时间
  updateTime: function (that) {

    innerAudioContext.onTimeUpdate((res) => {

      //更新时把当前的值给slide组件里的value值。slide的滑块就能实现同步更新
      console.log("duratio的值：", timeStamp(innerAudioContext.duration.toFixed()))
      console.log("curTimeVal的值：", timeStamp(innerAudioContext.currentTime.toFixed()))

      that.setData({

        duration: innerAudioContext.duration.toFixed(),

        curTimeVal: timeStamp(innerAudioContext.currentTime.toFixed()),

      })
    })

  },
  //拖动滑块

  slideBar: function (e) {

    let that = this;

    var curval = e.detail.value; //滑块拖动的当前值

    innerAudioContext.seek(curval); //让滑块跳转至指定位置

    innerAudioContext.onSeeked((res) => {

      this.updateTime(that) //注意这里要继续出发updataTime事件，

    })


  },

  setStopState: function (that) {
    that.setData({
      curTimeVal: "00:00",
      play: !that.data.play
    })
     //播放完成返回上一页
    //  wx.navigateBack();
  }


});
// 秒转换成 00:00格式
function timeStamp(second_time) {
  var time = parseInt(second_time);
  if (parseInt(second_time) < 10) {
    time = "00:0" + time
  } else if (parseInt(second_time) >= 10 && parseInt(second_time) < 60) {
    time = "00:" + time
  } else {
    var second = parseInt(second_time) % 60;
    var min = parseInt(second_time / 60);
    if (second<10){
      time = "0" + min + ":0" + second;
    }else{
      time = "0" + min + ":" + second;
    }

    if (min > 60) {
      min = parseInt(second_time / 60) % 60;
      var hour = parseInt(parseInt(second_time / 60) / 60);
      time = hour + "小时" + min + "分" + second + "秒";

      if (hour > 24) {
        hour = parseInt(parseInt(second_time / 60) / 60) % 24;
        var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
        time = day + "天" + hour + "小时" + min + "分" + second + "秒";
      }
    }

  }

  return time;
} 