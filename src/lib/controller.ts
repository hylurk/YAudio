import Tool from '../tools/index'

class Controller {

  public player: any

  constructor (player: any) {
    this.player = player
    // 绑定监听事件
    this.listenPlayToggle()
    this.listenDuration()
    this.listenCurrentTime()
    this.listenBar()
  }

  listenPlayToggle () {
    this.player.template.playBtn.addEventListener('click', () => {
      this.player.toggle()
    })
  }
  listenDuration () {
    this.player.audio.addEventListener('durationchange', () => {
      this.player.durationChange()
    })
  }
  listenCurrentTime () {
    this.player.audio.addEventListener('timeupdate', () => {
      this.player.currentTimeUpdate()
    })
  }
  listenBar () {
    const thumbMove = (e: any) => {
      // 计算点下的位置
      let percentage = ((e.clientX || e.changedTouches[0].clientX) - Tool.getBoundingClientRectViewLeft(this.player.template.playProgress)) / this.player.template.playProgress.clientWidth
      this.player.bar.set('played', percentage, 'width')
      // this.template.playCurrentTime.innerHTML = Tool.secondToTime(time)
    }

    const thumbUp = (e: any) => {
      // 移除监听事件
      document.removeEventListener('mouseup', thumbUp)
      document.removeEventListener('mousemove', thumbMove)
      // 计算点下的位置
      let percentage = ((e.clientX || e.changedTouches[0].clientX) - Tool.getBoundingClientRectViewLeft(this.player.template.playProgress)) / this.player.template.playProgress.clientWidth
      this.player.bar.set('played', percentage, 'width')
      this.player.seek(this.player.bar.get('played') * this.player.audio.duration)
    }

    this.player.template.playProgress.addEventListener('mouseup', () => {
      //
    })
    this.player.template.playProgress.addEventListener('mousedown', () => {
      // 开始监听
      document.addEventListener('mouseup', thumbUp)
      document.addEventListener('mousemove', thumbMove)
    })
    this.player.template.playProgress.addEventListener('mousemove', (e: any) => {
      // 实时计算位置，并让 thumb 和 played 跟随
      if (this.player.audio.duration) {
        const px = Tool.cumulativeOffset(this.player.template.playProgress).left;
        const tx = (e.clientX || e.changedTouches[0].clientX) - px;
        if (tx < 0 || tx > this.player.template.playProgress.offsetWidth) {
            return;
        }
        const time = this.player.audio.duration * (tx / this.player.template.playProgress.offsetWidth);
        this.player.template.playHoverTime.style.left = `${(tx - (time >= 3600 ? 25 : 20))}px`;
        this.player.template.playHoverTime.innerText = Tool.secondToTime(time);
        this.player.template.playHoverTime.classList.remove('hidden');
      }
    })
  }
}

export default Controller