export function formateCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  }
  return count
}

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60) // 获取分钟数
  const seconds = Math.floor(time % 60) // 获取秒数

  // 如果秒数小于10，在前面补0
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

//格式化图片大小
export function formateImgUrl(
  url: string,
  width: number,
  height: number = width
) {
  return url + `?param=${width}y${height}`
}

// 获取播放音频
// export function getPlayUrl(id: number) {
//   // return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
//   return `http://codercba.com:9002/song/url/v1?id=${id}.mp3`
// }
