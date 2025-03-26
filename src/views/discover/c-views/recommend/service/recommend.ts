import myRequest from '@/service/axios'

export function getBanners() {
  return myRequest({
    url: '/banner'
  })
}

export function getHotRecommend(limit: number) {
  return myRequest({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbum(limit: number) {
  return myRequest({
    url: '/album/newest',
    params: {
      limit
    }
  })
}

export function getPlayList(id: number) {
  return myRequest({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getArtistList(limit: number) {
  return myRequest({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
