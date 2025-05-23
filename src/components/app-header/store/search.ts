import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSearchResult } from '@/components/app-header/service/search'

// 异步 action：根据关键词获取搜索结果
export const fetchSearchResultAction = createAsyncThunk(
  'search/fetchSearchResult',
  async (keywords: string, { dispatch }) => {
    const res = await getSearchResult(keywords)
    dispatch(changeSearchResultAction(res.result.songs ?? []))
  }
)

// State 类型定义
interface ISearchState {
  keywords: string
  resultList: any[]
}

const initialState: ISearchState = {
  keywords: '',
  resultList: []
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeKeywordsAction(state, { payload }) {
      state.keywords = payload
    },
    changeSearchResultAction(state, { payload }) {
      state.resultList = payload
    }
  }
})

export const { changeKeywordsAction, changeSearchResultAction } =
  searchSlice.actions
export default searchSlice.reducer
