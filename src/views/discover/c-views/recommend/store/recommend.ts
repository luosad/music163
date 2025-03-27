import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getArtistList,
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getPlayList
} from '../service/recommend'

//发送请求，获取数据并存储到store中
export const fetchRecommendDataAction = createAsyncThunk(
  'fetchdata',
  (argv, { dispatch }) => {
    getBanners().then((res) => {
      dispatch(changeBannersActions(res.banners))
      // console.log(res.banners)
    })
    getHotRecommend(8).then((res) => {
      dispatch(changeHotRecommendActions(res.result))
      // console.log(res.result)
    })
    getNewAlbum(10).then((res) => {
      dispatch(changeNewAlbumActions(res.albums))
    })
    getArtistList(5).then((res) => {
      dispatch(changeArtistListActions(res.artists))
    })
  }
)

//获取排行版数据
const rankingIds = [19723756, 3779629, 2884035]
const promises: Promise<any>[] = []
export const fetchPlayListAction = createAsyncThunk(
  'fetchPlayList',
  (_, { dispatch }) => {
    for (const id of rankingIds) {
      promises.push(getPlayList(id))
    }
    Promise.all(promises).then((res) => {
      const playlists = res.map((item) => item.playlist)
      // console.log(playlists)
      dispatch(changePlayListActions(playlists))
    })
  }
)

interface RecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbum: any[]
  rankings: any[]
  singerList: any[]
}
const initialState: RecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbum: [],
  rankings: [],
  singerList: []
}
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    //更改state的另一种方式
    changeBannersActions(state, action) {
      state.banners = action.payload
    },
    changeHotRecommendActions(state, action) {
      state.hotRecommends = action.payload
    },
    changeNewAlbumActions(state, action) {
      state.newAlbum = action.payload
    },
    changePlayListActions(state, action) {
      state.rankings = action.payload
    },
    changeArtistListActions(state, action) {
      state.singerList = action.payload
    }
  }
  /* 更改state的一种方式 */
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannersAction.fulfilled, (state, action) => {
  //       state.banners = action.payload
  //     })
  //     .addCase(fetchBannersAction.rejected, (state, action) => {
  //       console.log('rejectd')
  //     })
  //     .addCase(fetchBannersAction.pending, (state, action) => {
  //       console.log('pending')
  //     })
  // }
})

export const {
  changeBannersActions,
  changeHotRecommendActions,
  changeNewAlbumActions,
  changePlayListActions,
  changeArtistListActions
} = recommendSlice.actions
export default recommendSlice.reducer
