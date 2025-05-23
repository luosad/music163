import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
// import Discover from '@/views/discover'
// import Mine from '@/views/mine'
// import Download from '@/views/download'
// import Focus from '@/views/focus'

//懒加载提高性能
//推荐页面
const Discover = lazy(() => import('@/views/discover'))
const Album = lazy(() => import('@/views/discover/c-views/album'))
const Artist = lazy(() => import('@/views/discover/c-views/artist'))
const Djradio = lazy(() => import('@/views/discover/c-views/djradio'))
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'))
const Songs = lazy(() => import('@/views/discover/c-views/songs'))
const Recommend = lazy(() => import('@/views/discover/c-views/recommend'))

const Mine = lazy(() => import('@/views/mine'))
const Download = lazy(() => import('@/views/download'))
const Focus = lazy(() => import('@/views/focus'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
    // element: <Discover />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/download',
    element: <Download />
  },
  {
    path: '/focus',
    element: <Focus />
  }
]

export default routes
