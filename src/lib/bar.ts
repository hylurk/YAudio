class Bar {

  public elements: any

  constructor (template: any) {
    this.elements = {}
    this.elements.played = template.playPlayed
    this.elements.loaded = template.playLoaded
    this.elements.volumeSize = template.volumeSize
  }
  
  set (type: string, percentage: number, property: string) {
    percentage = Math.max(percentage, 0)
    percentage = Math.min(percentage, 1)
    this.elements[type].style[property] = percentage * 100 + '%'
  }
  get (type: string, property: string = 'width') {
    return parseFloat(this.elements[type].style[property]) / 100
  }
}

export default Bar