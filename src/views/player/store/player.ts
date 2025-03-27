import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getCurrtentSong, getCurrtentSongUrl } from '../service/player'

export const fetchCurrentSongAction = createAsyncThunk(
  'fetchCurrentSong',
  (argv, { dispatch }) => {
    getCurrtentSong(386538).then((res) => {
      // console.log(res)
      dispatch(changeCurrentSongAction(res))
    })
  }
)

export const fetchCurrentSongUrlAction = createAsyncThunk(
  'fetchCurrentSongUrl',
  (id: number, { dispatch }) => {
    getCurrtentSongUrl(386538).then((res) => {
      console.log(res)
      dispatch(changeCurrentSongUrlAction(res))
    })
  }
)

interface IPlayerState {
  currentSong: any
  currentSongUrl: any
}
const initialState: IPlayerState = {
  // currentSong: null
  // currentSong: {
  //   songs: [
  //     {
  //       name: '温柔',
  //       mainTitle: null,
  //       additionalTitle: null,
  //       id: 386538,
  //       pst: 0,
  //       t: 0,
  //       ar: [
  //         {
  //           id: 13193,
  //           name: '五月天',
  //           tns: [],
  //           alias: []
  //         }
  //       ],
  //       alia: [],
  //       pop: 100,
  //       st: 0,
  //       rt: '600902000000534560',
  //       fee: 1,
  //       v: 97,
  //       crbt: null,
  //       cf: '',
  //       al: {
  //         id: 38285,
  //         name: '我们是五月天',
  //         picUrl:
  //           'https://p2.music.126.net/XlMYABTsvXGxOn0h9F61VQ==/109951168750902183.jpg',
  //         tns: [],
  //         pic_str: '109951168750902183',
  //         pic: 109951168750902180
  //       },
  //       dt: 269800,
  //       h: {
  //         br: 320000,
  //         fid: 0,
  //         size: 10794885,
  //         vd: -63966,
  //         sr: 44100
  //       },
  //       m: {
  //         br: 192000,
  //         fid: 0,
  //         size: 6476948,
  //         vd: -61383,
  //         sr: 44100
  //       },
  //       l: {
  //         br: 128000,
  //         fid: 0,
  //         size: 4317980,
  //         vd: -59695,
  //         sr: 44100
  //       },
  //       sq: {
  //         br: 1053726,
  //         fid: 0,
  //         size: 35536923,
  //         vd: -64088,
  //         sr: 44100
  //       },
  //       hr: null,
  //       a: null,
  //       cd: '1',
  //       no: 2,
  //       rtUrl: null,
  //       ftype: 0,
  //       rtUrls: [],
  //       djId: 0,
  //       copyright: 0,
  //       s_id: 0,
  //       mark: 17179877888,
  //       originCoverType: 1,
  //       originSongSimpleData: null,
  //       tagPicList: null,
  //       resourceState: true,
  //       version: 80,
  //       songJumpInfo: null,
  //       entertainmentTags: null,
  //       awardTags: null,
  //       displayTags: null,
  //       single: 0,
  //       noCopyrightRcmd: null,
  //       mv: 10929721,
  //       cp: 684010,
  //       rtype: 0,
  //       rurl: null,
  //       mst: 9,
  //       publishTime: 1049126400000
  //     }
  //   ],
  //   privileges: [
  //     {
  //       id: 386538,
  //       fee: 1,
  //       payed: 0,
  //       st: 0,
  //       pl: 0,
  //       dl: 0,
  //       sp: 7,
  //       cp: 1,
  //       subp: 1,
  //       cs: false,
  //       maxbr: 999000,
  //       fl: 0,
  //       toast: false,
  //       flag: 1284,
  //       preSell: false,
  //       playMaxbr: 999000,
  //       downloadMaxbr: 999000,
  //       maxBrLevel: 'lossless',
  //       playMaxBrLevel: 'lossless',
  //       downloadMaxBrLevel: 'lossless',
  //       plLevel: 'none',
  //       dlLevel: 'none',
  //       flLevel: 'none',
  //       rscl: null,
  //       freeTrialPrivilege: {
  //         resConsumable: true,
  //         userConsumable: false,
  //         listenType: 0,
  //         cannotListenReason: 0,
  //         playReason: null,
  //         freeLimitTagType: null
  //       },
  //       rightSource: 0,
  //       chargeInfoList: [
  //         {
  //           rate: 128000,
  //           chargeUrl: null,
  //           chargeMessage: null,
  //           chargeType: 1
  //         },
  //         {
  //           rate: 192000,
  //           chargeUrl: null,
  //           chargeMessage: null,
  //           chargeType: 1
  //         },
  //         {
  //           rate: 320000,
  //           chargeUrl: null,
  //           chargeMessage: null,
  //           chargeType: 1
  //         },
  //         {
  //           rate: 999000,
  //           chargeUrl: null,
  //           chargeMessage: null,
  //           chargeType: 1
  //         }
  //       ],
  //       code: 0,
  //       message: null
  //     }
  //   ],
  //   code: 200
  // }
  currentSong: {},
  currentSongUrl: {}
}
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, action) {
      state.currentSong = action.payload
    },
    changeCurrentSongUrlAction(state, action) {
      state.currentSongUrl = action.payload
    }
  }
})

export const { changeCurrentSongAction, changeCurrentSongUrlAction } =
  playerSlice.actions
export default playerSlice.reducer
