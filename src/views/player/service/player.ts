import myRequest from '@/service/axios'

//获取歌曲详情
export function getCurrtentSong(ids: number) {
  return myRequest({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

//获取音频
export function getCurrtentSongUrl(id: number) {
  return myRequest({
    url: '/song/url/v1',
    params: {
      id
    }
  })
}

//获取歌词
export function getLyric(id: number) {
  return myRequest({
    url: '/lyric',
    params: {
      id
    }
  })
}
