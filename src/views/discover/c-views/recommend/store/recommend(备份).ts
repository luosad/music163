import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBanners, getHotRecommend, getNewAlbum } from '../service/recommend'
import { log } from 'console'

//banner数据
export const fetchBannersAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanners()
    // console.log(res)
    dispatch(changeBannersActions(res.banners))
    // return res.banners
  }
)

//热门推荐数据
export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    // console.log(res)
    dispatch(changeHotRecommendActions(res.result))
    // return res.banners
  }
)

//新碟上架数据
export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum(10)
    console.log(res)
    dispatch(changeNewAlbumActions(res.albums))
    // return res.banners
  }
)

interface RecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbum: any[]
}
const initialState: RecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbum: []
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
  changeNewAlbumActions
} = recommendSlice.actions
export default recommendSlice.reducer
