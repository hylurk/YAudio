import * as Interface from '../interface/index'
import Browser from '../tools/browsersinfo'

export default (options: Interface.IConfig) => {
  const browserInfo = new Browser()
  const defaultOptions = {
    container: options.container,
    env: browserInfo.os.platform || 'pc', // pc 或 mobile ，播放器所处环境
    autoplay: true,
    volume: 1,
    muted: false,
    loop: false,
    preload: 'auto',
    controls: true
  }
  return Object.assign({}, defaultOptions, options)
}