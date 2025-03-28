export interface Ilyric {
  time: number
  content: string
}
// 歌词解析
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export const parseLyric = (lyric: string) => {
  // 先将歌词按行分割
  const lines: string[] = lyric.split('\n')

  //对每行歌词进行解析
  const lyrics: Ilyric[] = []
  for (let line of lines) {
    const result = timeRegExp.exec(line)
    // console.log(result)
    if (!result) continue

    //获取时间
    const minute = Number(result[1]) * 60 * 1000
    const second = Number(result[2]) * 1000
    const millisecond =
      result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10
    // console.log(minute, second, millisecond)
    const time = minute + second + millisecond

    //获取文本,去掉时间部分
    const content = line.replace(timeRegExp, '').trim()
    // console.log(content)

    //将时间和文本保存到歌词数组中
    lyrics.push({ time, content })
  }
  // console.log(lyrics)
  return lyrics
}
