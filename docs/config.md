---
sidebar: auto
---

# 配置

## 参数配置

### container

- 类型：``string``
- 默认值：``无``
- 是否必须：``是``

页面中装载音频播放器的 DOM 元素的 id 或者 class，如果此 class 名元素有多个，则取第一个。

### src

- 类型：``string | Array<string>``
- 默认值：``无``
- 是否必须：``是``

音频源地址。可以传入一个或多个地址，多个地址采用数组的方式传入，默认情况下，音频会根据传入的地址顺序依次播放。

### env

- 类型：``string``
- 默认值：``自动判断``
- 是否必须：``否``

播放器所处的环境。仅可有两种选项：``'pc'`` 或者 ``'mobile'``。如不传，会自动判断。

M 端播放器去掉了音量按钮。

### controls

- 类型：``boolean``
- 默认值：``true``
- 是否必须：``否``

是否显示自定义的播放器控制栏，默认为 true 。如果传入 false ，则会显示浏览器自己的播放器控制栏。

此控制条不能隐藏，否则没有播放按钮，无法播放音频。

### autoplay

- 类型：``boolean``
- 默认值：``true``
- 是否必须：``否``

是否自动播放。目前主流浏览器都不支持自动播放，因此此属性用处不大。

### preload

- 类型：``boolean``
- 默认值：``'auto'``
- 是否必须：``否``

是否在页面加载的时候就开始加载视频。

### loop

- 类型：``boolean``
- 默认值：``false``
- 是否必须：``否``

是否自动循环播放。

### volume

- 类型：``number``
- 默认值：``1``
- 是否必须：``否``

默认播放器音量。只能传入 ``0 ~ 1`` 之间的数字，建议最多保留两位小数。

### muted

- 类型：``boolean``
- 默认值：``false``
- 是否必须：``否``

是否静音播放。音频静音播放，没多大意义吧？

## 用户获取播放器信息

如果想获取音频在播放过程中的一些信息，我们也提供了一些方法：

### currentTime

- 类型：``function``
- 返回值：``number``
- 是否必须：``否``

获取音频当前播放的时间，单位秒。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const currentTime = myAudio.custom.handle('currentTime')
```

### playStatus

- 类型：``function``
- 返回值：``string``
- 是否必须：``否``

获取播放器当前播放状态，是在播放（`'playing'`）还是暂停（`'paused'`）。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const playStatus = myAudio.custom.handle('playStatus')
```

### mutedStatus

- 类型：``function``
- 返回值：``boolean``
- 是否必须：``否``

获取播放器当前是否处于静音状态。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const isMuted = myAudio.custom.handle('mutedStatus')
```

## 用户自定义事件回调

有时我们也会想播放器状态发生改变的时候，能够执行一些我们自己的方法，：

### play

- 类型：``function``
- 参数类型：``callback()``
- 是否必须：``否``

再播放器执行播放事件的时候触发。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const myFunction = () => {
  console.log('播放的时候我就出来了')
}

myAudio.custom.handle('play', myFunction)
```

### paused

- 类型：``function``
- 参数类型：``callback()``
- 是否必须：``否``

再播放器执行播放事件的时候触发。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const myFunction = () => {
  console.log('暂停的时候我就出来了')
}

myAudio.custom.handle('paused', myFunction)
```

### durationChange

- 类型：``function``
- 参数类型：``callback()``
- 是否必须：``否``

再播放器执行播放事件的时候触发。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const myFunction = () => {
  console.log('音频预备好的时候我就出来了')
}

myAudio.custom.handle('durationChange', myFunction)
```

### ended

- 类型：``function``
- 参数类型：``callback()``
- 是否必须：``否``

再播放器执行播放事件的时候触发。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const myFunction = () => {
  console.log('播放结束的时候我就出来了')
}

myAudio.custom.handle('ended', myFunction)
```

### playEvent

- 类型：``function``
- 参数类型：``callback()``
- 是否必须：``否``

再播放器执行播放事件的时候触发。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const myFunction = () => {
  console.log('用户点击播放/暂停按钮的时候我就出来了')
}

myAudio.custom.handle('playEvent', myFunction)
```

### timeUpdate

- 类型：``function``
- 参数类型：``callback()``
- 是否必须：``否``

再播放器执行播放事件的时候触发。

示例代码：

```js
const myAudio = new YAudio({
  src: './01.mp3',
  container: '#wrapper',
  // 省略一些其他配置
})

const myFunction = () => {
  console.log('音频播放时间改变的时候我就出来了')
}

myAudio.custom.handle('timeUpdate', myFunction)
```