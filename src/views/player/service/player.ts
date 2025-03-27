import myRequest from '@/service/axios'

export function getCurrtentSong(ids: number) {
  return myRequest({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getCurrtentSongUrl(id: number) {
  return myRequest({
    url: '/song/url/v1',
    params: {
      id
    }
  })
}
