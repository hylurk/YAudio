import * as Interface from '../interface/index'
import handleOption from './options'
import Template from './template'
import Icons from './icons'
import Bar from './bar'
import Controller from './controller'
import Tool from '../tools/index'
import Custom from './custom'

class YAudio {

  public template: any
  public options: Interface.IConfig
  public audio: HTMLAudioElement
  public paused: boolean
  public bar: any
  public controller: any
  public muted: boolean
  public custom: any
  // custom event
  public playCallback: Function
  public pausedCallback: Function
  public durationChangeCallBack: Function
  public endedCallBack: Function
  public playEventCallback: Function
  public timeUpdateCallback: Function

  constructor (options: Interface.IConfig) {
    // 合并参数
    this.options = handleOption(options)
    // 模板
    this.template = new Template(this.options)
    // 播放器，默认为暂停状态
    this.paused = true
    this.muted = false
    this.audio = this.template.audio
    // controls 事件监听
    if (this.options.controls) {
      this.bar = new Bar(this.template)
      this.controller = new Controller(this)
    }
    // 用户事件
    this.custom = new Custom(this)
    // 初始化用户 callback 函数
    this.playCallback = () => {}
    this.pausedCallback = () => {}
    this.durationChangeCallBack = () => {}
    this.endedCallBack = () => {}
    this.playEventCallback = () => {}
    this.timeUpdateCallback = () => {}
  }

  play () {
    this.paused = false
    this.template.playIcon.innerHTML = Icons.pause
    this.audio.play()
    this.playCallback()
  }
  pause () {
    this.paused = true
    this.template.playIcon.innerHTML = Icons.play
    this.audio.pause()
    this.pausedCallback()
  }
  toggle () {
    this.paused ? this.play() : this.pause()
    this.playEventCallback()
  }
  durationChange () {
    this.template.playDuration.innerHTML = Tool.secondToTime(this.audio.duration)
    // compatibility: Android browsers will output 1 or Infinity at first
    // if (this.video.duration !== 1 && this.video.duration !== Infinity) {
    //   this.template.playDuration.innerHTML = Tool.secondToTime(this.video.duration)
    // }
    this.durationChangeCallBack()
  }
  currentTimeUpdate () {
    this.template.playCurrentTime.innerHTML = Tool.secondToTime(this.audio.currentTime)
    this.bar.set('played', this.audio.currentTime / this.audio.duration, 'width')
    this.timeUpdateCallback()
  }
  seek (time: number) {
    time = Math.max(time, 0)
    if (this.audio.duration) {
      time = Math.min(time, this.audio.duration)
    }
    this.audio.currentTime = time
    this.bar.set('played', time / this.audio.duration, 'width')
    this.template.playCurrentTime.innerHTML = Tool.secondToTime(time)
  }
  progressChange () {
    const percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0
    this.bar.set('loaded', percentage, 'width')
  }
  ended () {
    // 处理音频源为多个的情况
    if (Array.isArray(this.options.src)) {
      if (this.options.currentSrcIndex < this.options.srcList.length - 1) {
        this.options.currentSrcIndex++
        this.audio.src = this.options.srcList[this.options.currentSrcIndex]
      }
    }
    this.endedCallBack()
  }
  mutedToggle () {
    if (this.muted) {
      this.muted = false
      this.template.mutedIcon.innerHTML = Icons.volumeOn
      this.audio.muted = false
    } else {
      this.muted = true
      this.template.mutedIcon.innerHTML = Icons.volumeOff
      this.audio.muted = true
    }
  }
}

export default YAudio