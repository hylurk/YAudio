import * as Interface from '../interface/index'
import Browser from '../tools/browsersinfo'

export default (options: Interface.IConfig) => {
  const browserInfo = new Browser()
  const defaultOptions = {
    env: browserInfo.os.platform || 'pc', // pc 或 mobile ，播放器所处环境
    controls: true,
    autoplay: true,
    preload: 'auto',
    loop: false,
    volume: 1,
    muted: false,
    currentSrcIndex: 0,
    srcList: ['']
  }
  // 处理音频源为多个的情况，将音频源列表存储起来
  if (Array.isArray(options.src)) {
    defaultOptions.currentSrcIndex = 0
    defaultOptions.srcList = options.src
    options.src = defaultOptions.srcList[0]
  }
  return Object.assign({}, defaultOptions, options)
}