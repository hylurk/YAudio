import * as Interface from '../interface/index'
import handleOption from './options'
import Template from './template'
import Icons from './icons'
import Bar from './bar'
import Controller from './controller'
import Tool from '../tools/index'

class YAudio {

  public template: any
  public options: Interface.IConfig
  public audio: HTMLAudioElement
  public paused: boolean
  public bar: any
  public controller: any  

  constructor (options: Interface.IConfig) {
    // 合并参数
    this.options = handleOption(options)
    // 模板
    this.template = new Template(this.options)
    // 播放器，默认为暂停状态
    this.paused = true
    this.audio = this.template.audio
    // controls 事件监听
    if (this.options.controls) {
      this.bar = new Bar(this.template)
      this.controller = new Controller(this)
    }
  }

  play () {
    this.paused = false
    this.template.playTitle.innerHTML = '暂停'
    this.template.playIcon.innerHTML = Icons.pause
    this.audio.play()
  }
  pause () {
    this.paused = true
    this.template.playTitle.innerHTML = '播放'
    this.template.playIcon.innerHTML = Icons.play
    this.audio.pause()
  }
  toggle () {
    this.paused ? this.play() : this.pause()
  }
  durationChange () {
    this.template.playDuration.innerHTML = Tool.secondToTime(this.audio.duration)
    // compatibility: Android browsers will output 1 or Infinity at first
    // if (this.video.duration !== 1 && this.video.duration !== Infinity) {
    //   this.template.playDuration.innerHTML = Tool.secondToTime(this.video.duration)
    // }
  }
  currentTimeUpdate () {
    this.template.playCurrentTime.innerHTML = Tool.secondToTime(this.audio.currentTime)
    this.bar.set('played', this.audio.currentTime / this.audio.duration, 'width')
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
}

export default YAudio