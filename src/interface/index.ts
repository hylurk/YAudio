export interface IConfig {
  container: string,
  src: string | string[],
  volume?: number,
  env?: string,
  autoplay?: boolean,
  muted?: boolean,
  loop?: boolean,
  preload?: string,
  controls?: boolean,
  currentSrcIndex?: number,
  srcList?: string[]
}