class Custom {

  public player: any
  public eventsName: string[]

  constructor (player: any) {
    this.player = player
    this.eventsName = [
      'play',
      'paused',
      'durationChange',
      'ended',
      'playEvent',
      'timeUpdate'
    ]
  }

  // 根据用户传入事件名，处理对应事件
  handle (event: string, callback?: Function) {
    // 获取当前播放时间
    if (event === 'currentTime') {
      return this.player.audio.currentTime
    }

    // 获取当前播放状态
    if (event === 'playStatus') {
      return this.player.audio.paused ? 'paused' : 'playing'
    }

    // 获取当前静音状态
    if (event === 'mutedStatus') {
      return this.player.audio.muted ? true : false
    }

    // 音频播放，执行自定义函数
    this.eventsName.forEach(item => {
      if (item === event) {
        this.player[`${item}Callback`] = callback
      }
    })
  }
}

export default Custom