export default {
  /**
   * @function 将视频时长转化成时分秒格式
   * @param { number } second
   * @return { string } HH:MM:SS or MM:SS
   */
  secondToTime: (second: number): string => {
    const add0 = (num: number) => num < 10 ? '0' + num : '' + num;
    const hour = Math.floor(second / 3600);
    const min = Math.floor((second - hour * 3600) / 60);
    const sec = Math.floor(second - hour * 3600 - min * 60);
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
  },
  /**
    * @function 计算某节点距离边界的位置
    * @param { element } element
    * @return { number } left number
    * @description getBoundingClientRect 在 IE8 及以下返回的值缺失 width、height 值
    * @description getBoundingClientRect 在 Firefox 11 及以下返回的值会把 transform 的值也包含进去
    * @description getBoundingClientRect 在 Opera 10.5 及以下返回的值缺失 width、height 值
    */
  getBoundingClientRectViewLeft(element: any) {
    const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

    if (element.getBoundingClientRect) {
      if (typeof this.getBoundingClientRectViewLeft.offset !== 'number') {
        let temp = document.createElement('div');
        temp.style.cssText = 'position:absolute;top:0;left:0;';
        document.body.appendChild(temp);
        this.getBoundingClientRectViewLeft.offset = -temp.getBoundingClientRect().top - scrollTop;
        document.body.removeChild(temp);
        temp = null;
      }
      const rect = element.getBoundingClientRect();
      const offset = this.getBoundingClientRectViewLeft.offset;

      return rect.left + offset;
    } else {
      // not support getBoundingClientRect
      let actualLeft = element.offsetLeft;
      let current = element.offsetParent;
      const elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
      // if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      if (!document.fullscreenElement) {
        while (current !== null) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
      }
      else {
        while (current !== null && current !== element) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
      }
      return actualLeft - elementScrollLeft;
    }
  },
  getBoundingClientRectViewTop(element: any) {
    const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

    if (element.getBoundingClientRect) {
      if (typeof this.getBoundingClientRectViewTop.offset !== 'number') {
        let temp = document.createElement('div');
        temp.style.cssText = 'position:absolute;top:0;left:0;';
        document.body.appendChild(temp);
        this.getBoundingClientRectViewTop.offset = -temp.getBoundingClientRect().top - scrollTop;
        document.body.removeChild(temp);
        temp = null;
      }
      const rect = element.getBoundingClientRect();
      const offset = this.getBoundingClientRectViewTop.offset;

      return rect.top + offset;
    } else {
      // not support getBoundingClientRect
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      const elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
      // if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      if (!document.fullscreenElement) {
        while (current !== null) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }
      }
      else {
        while (current !== null && current !== element) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }
      }
      return actualTop - elementScrollTop;
    }
  },
  cumulativeOffset: (element: any) => {
    let top = 0
    let left = 0
    do {
      top += element.offsetTop || 0
      left += element.offsetLeft || 0
      element = element.offsetParent
    } while (element)
    return {
      top: top,
      left: left
    }
  }
}