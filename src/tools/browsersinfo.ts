interface IOS {
  name: string,
  platform: string
}

class Browser {

  public ua: string
  public os: IOS

  constructor (userAgent?: string) {
    this.ua = userAgent || navigator.userAgent
    this.info()
  }

  info () {
    this.os = this.getOS()
    let match = this.ua.match(/(opera|coast|chrome|safari|firefox|edge|trident(?=\/))\/?\s*?(\S+)/i) || []
    let temp = this.ua.match(/\bIEMobile\/(\S+[0-9])/)
    if (temp !== null) {
      return {
        name: 'IEMobile',
        version: temp[1].split('.')[0],
        fullVersion: temp[1],
        os: this.os
      }
    }
    if (/trident/i.test(match[1])) {
      temp = /\brv[ :]+(\S+[0-9])/g.exec(this.ua) || []
      return {
        name: 'IE',
        version: temp[1] && temp[1].split('.')[0],
        fullVersion: temp[1],
        os: this.os
      }
    }
    if (match[1] === 'Chrome') {
      temp = this.ua.match(/\bOPR\/(\d+)/)
      if (temp !== null) {
        return {
          name: 'Opera',
          version: temp[1].split('.')[0],
          fullVersion: temp[1],
          os: this.os
        }
      }
  
      temp = this.ua.match(/\bEdge\/(\S+)/)
      if (temp !== null) {
        return {
          name: 'Edge',
          version: temp[1].split('.')[0],
          fullVersion: temp[1],
          os: this.os
        }
      }
    }
    match = match[2]? [match[1], match[2]]: [navigator.appName, navigator.appVersion, '-?']
    if (match[0] === 'Coast') {
      match[0] = 'OperaCoast'
    }
    if (match[0] !== 'Chrome') {
      temp = this.ua.match(/version\/(\S+)/i)
      if (temp !== null && temp.length) {
        match.splice(1, 1, temp[1])
      }
    }
    if (match[0] === 'Firefox') {
      match[0] = /waterfox/i.test(this.ua)
        ? 'Waterfox'
        : match[0]
    }
    return {
      name: match[0],
      version: match[1].split('.')[0],
      fullVersion: match[1],
      os: this.os
    }
  }

  getOS () {
    if (this.ua.indexOf('Windows Phone') !== -1) {
      return {
        name: 'Windows Phone',
        platform: 'mobile'
      }
    }
    if (this.ua.indexOf('Win') !== -1) {
      return {
        name: 'Windows',
        platform: 'pc'
      }
    }
    if (this.ua.indexOf('Android') !== -1) {
      return {
        name: 'Android',
        platform: 'mobile'
      }
    }
    if (this.ua.indexOf('Linux') !== -1) {
      return {
        name: 'Linux',
        platform: 'pc'
      }
    }
    if (this.ua.indexOf('X11') !== -1) {
      return {
        name: 'UNIX',
        platform: 'pc'
      }
    }
    if (/iPad|iPhone|iPod/.test(this.ua)) {
      return {
        name: 'iOS',
        platform: 'mobile'
      }
    }
    if (this.ua.indexOf('Mac') !== -1) {
      return {
        name: 'OS X',
        platform: 'pc'
      }
    }
  }
}

export default Browser
