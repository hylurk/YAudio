import Icons from './icons'
import * as Interface from '../interface/index'
import tplPlayer from '../template/player.art'

class Template {

  public options: Interface.IConfig
  public container: HTMLElement
  public audio: HTMLAudioElement
  public playBtn: HTMLButtonElement
  public playTitle: HTMLSpanElement
  public playIcon: HTMLDivElement
  public playDuration: HTMLDivElement
  public playCurrentTime: HTMLDivElement
  public playProgress: HTMLDivElement
  public playHoverTime: HTMLDivElement
  public playLoaded: HTMLDivElement
  public playPlayed: HTMLDivElement
  public volumeBar: HTMLDivElement
  public volumeSize: HTMLDivElement
  public mutedBtn: HTMLDivElement
  public mutedIcon: HTMLDivElement

  constructor (options: Interface.IConfig) {
    this.container = document.querySelector(options.container)
    this.options = options
    this.init()
  }
  init () {
    this.container.innerHTML = tplPlayer({
      options: this.options,
      icons: Icons
    })

    this.audio = this.container.querySelector('.y-audio')
    this.playBtn = this.container.querySelector('.y-play-btn')
    this.playTitle = this.container.querySelector('.y-play-btn-title')
    this.playIcon = this.container.querySelector('.y-play-icon')
    this.playDuration = this.container.querySelector('.y-time-duration')
    this.playCurrentTime = this.container.querySelector('.y-time-current')
    this.playProgress = this.container.querySelector('.y-controls-progress')
    this.playHoverTime = this.container.querySelector('.y-bar-time')
    this.playLoaded = this.container.querySelector('.y-bar-loaded')
    this.playPlayed = this.container.querySelector('.y-bar-played')
    this.volumeBar = this.container.querySelector('.y-volume-bar')
    this.volumeSize = this.container.querySelector('.y-volume-bar-size')
    this.mutedBtn = this.container.querySelector('.y-volume-btn')
    this.mutedIcon = this.container.querySelector('.y-volume-icon')
  }
}

export default Template