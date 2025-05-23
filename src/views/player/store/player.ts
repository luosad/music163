import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import {
  getCurrtentSong,
  getCurrtentSongUrl,
  getLyric
} from '../service/player'
import { Ilyric, parseLyric } from '@/utils/parse-lyric'
import { IRootState } from '@/store'

//获取当前歌曲
export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>(
  'fetchCurrentSong',
  //查看现在歌曲是否在歌曲链表中
  (ids, { dispatch, getState }) => {
    const playSongList = getState().player.playSongList
    const findIndex = playSongList.findIndex((item) => item.id === ids)
    // 如果没有找到，就发送请求,并添加到列表中
    if (findIndex === -1) {
      getCurrtentSong(ids).then((res) => {
        // console.log(res)
        if (!res.songs.length) return
        const song = res.songs[0]
        const newSongList = [...playSongList, song]
        dispatch(changeCurrentSongAction(song))
        dispatch(changeplaySongListAction(newSongList))
        dispatch(changeplaySongIndexAction(newSongList.length - 1))
        //通过当前歌曲的id获取对应音频和歌词
        dispatch(fetchCurrentSongUrlAction(song.id))
      })
    } else {
      const song = playSongList[findIndex]
      dispatch(changeCurrentSongAction(song))
      dispatch(changeplaySongIndexAction(findIndex))
      dispatch(fetchCurrentSongUrlAction(song.id))
    }
  }
)

//获取音频
export const fetchCurrentSongUrlAction = createAsyncThunk(
  'fetchCurrentSongUrl',
  (id: number, { dispatch }) => {
    //获取音频
    getCurrtentSongUrl(id).then((res) => {
      // console.log(res)
      if (!res.data.length) return
      const song = res.data[0]
      dispatch(changeCurrentSongUrlAction(song))
    })
    //获取歌词
    getLyric(id).then((res) => {
      console.log(res.lrc)
      const lyrics = parseLyric(res.lrc.lyric)
      // dispatch(changeLyricAction(res))
      dispatch(changeLyricAction(lyrics))
    })
  }
)

//根据模式切换歌曲
export const changeMusicAction = createAsyncThunk<
  void,
  boolean,
  { state: IRootState }
>('changeMusic', (isNext, { dispatch, getState }) => {
  const player = getState().player
  const playMode = player.playMode
  const playSongList = player.playSongList
  const playSongIndex = player.playSongIndex

  let newIndex = playSongIndex
  //随机播放
  if (playMode === 1) {
    newIndex = Math.floor(Math.random() * playSongList.length)
  } else {
    newIndex = isNext
      ? (playSongIndex + 1) % playSongList.length
      : (playSongIndex - 1) % playSongList.length
  }

  //获取歌曲
  const song = playSongList[newIndex]
  dispatch(changeCurrentSongAction(song))
  dispatch(changeplaySongIndexAction(newIndex))
  dispatch(fetchCurrentSongAction(song.id))
})

interface IPlayerState {
  currentSong: any
  currentSongUrl: any
  currentSongLyric: Ilyric[]
  LyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
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
  currentSongUrl: {},
  currentSongLyric: [],
  LyricIndex: -1,
  playSongList: [
    {
      name: '温柔',
      mainTitle: null,
      additionalTitle: null,
      id: 386538,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 13193,
          name: '五月天',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000000534560',
      fee: 1,
      v: 97,
      crbt: null,
      cf: '',
      al: {
        id: 38285,
        name: '我们是五月天',
        picUrl:
          'https://p2.music.126.net/XlMYABTsvXGxOn0h9F61VQ==/109951168750902183.jpg',
        tns: [],
        pic_str: '109951168750902183',
        pic: 109951168750902180
      },
      dt: 269800,
      h: {
        br: 320000,
        fid: 0,
        size: 10794885,
        vd: -63966,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6476948,
        vd: -61383,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4317980,
        vd: -59695,
        sr: 44100
      },
      sq: {
        br: 1053726,
        fid: 0,
        size: 35536923,
        vd: -64088,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 2,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17179877888,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 80,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      displayTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 10929721,
      cp: 684010,
      rtype: 0,
      rurl: null,
      mst: 9,
      publishTime: 1049126400000
    }
    // {
    //   name: '海阔天空',
    //   mainTitle: null,
    //   additionalTitle: null,
    //   id: 347230,
    //   pst: 0,
    //   t: 0,
    //   ar: [
    //     {
    //       id: 11127,
    //       name: 'Beyond',
    //       tns: [],
    //       alias: []
    //     }
    //   ],
    //   alia: [],
    //   pop: 100,
    //   st: 0,
    //   rt: '600902000004240302',
    //   fee: 1,
    //   v: 137,
    //   crbt: null,
    //   cf: '',
    //   al: {
    //     id: 34209,
    //     name: '海阔天空',
    //     picUrl:
    //       'https://p2.music.126.net/iAwVf8ag_45csIUuh1wSZg==/109951168912558470.jpg',
    //     tns: [],
    //     pic_str: '109951168912558470',
    //     pic: 109951168912558460
    //   },
    //   dt: 326000,
    //   h: {
    //     br: 320001,
    //     fid: 0,
    //     size: 13042460,
    //     vd: -5628,
    //     sr: 44100
    //   },
    //   m: {
    //     br: 192001,
    //     fid: 0,
    //     size: 7825493,
    //     vd: -3050,
    //     sr: 44100
    //   },
    //   l: {
    //     br: 128001,
    //     fid: 0,
    //     size: 5217010,
    //     vd: -1489,
    //     sr: 44100
    //   },
    //   sq: {
    //     br: 797831,
    //     fid: 0,
    //     size: 32511640,
    //     vd: -5286,
    //     sr: 44100
    //   },
    //   hr: null,
    //   a: null,
    //   cd: '1',
    //   no: 1,
    //   rtUrl: null,
    //   ftype: 0,
    //   rtUrls: [],
    //   djId: 0,
    //   copyright: 1,
    //   s_id: 0,
    //   mark: 17179877376,
    //   originCoverType: 1,
    //   originSongSimpleData: null,
    //   tagPicList: null,
    //   resourceState: true,
    //   version: 120,
    //   songJumpInfo: null,
    //   entertainmentTags: null,
    //   awardTags: null,
    //   displayTags: null,
    //   single: 0,
    //   noCopyrightRcmd: null,
    //   mv: 376199,
    //   rtype: 0,
    //   rurl: null,
    //   mst: 9,
    //   cp: 1416737,
    //   publishTime: 747504000000,
    //   tns: ['Boundless Oceans, Vast Skies']
    // }
    // {
    //   name: '情非得已 (童声版)',
    //   mainTitle: '情非得已 ',
    //   additionalTitle: '(童声版)',
    //   id: 33894312,
    //   pst: 0,
    //   t: 0,
    //   ar: [
    //     {
    //       id: 122455,
    //       name: '群星',
    //       tns: [],
    //       alias: []
    //     }
    //   ],
    //   alia: [],
    //   pop: 25,
    //   st: 0,
    //   rt: null,
    //   fee: 0,
    //   v: 734,
    //   crbt: null,
    //   cf: '',
    //   al: {
    //     id: 3263929,
    //     name: '热门华语275',
    //     picUrl:
    //       'https://p1.music.126.net/cpoUinrExafBHL5Nv5iDHQ==/109951166361218466.jpg',
    //     tns: [],
    //     pic_str: '109951166361218466',
    //     pic: 109951166361218460
    //   },
    //   dt: 267232,
    //   h: {
    //     br: 320000,
    //     fid: 0,
    //     size: 10691439,
    //     vd: -23075,
    //     sr: 44100
    //   },
    //   m: {
    //     br: 192000,
    //     fid: 0,
    //     size: 6414880,
    //     vd: -23075,
    //     sr: 44100
    //   },
    //   l: {
    //     br: 128000,
    //     fid: 0,
    //     size: 4276601,
    //     vd: -23075,
    //     sr: 44100
    //   },
    //   sq: null,
    //   hr: null,
    //   a: null,
    //   cd: '1',
    //   no: 1,
    //   rtUrl: null,
    //   ftype: 0,
    //   rtUrls: [],
    //   djId: 0,
    //   copyright: 2,
    //   s_id: 0,
    //   mark: 524416,
    //   originCoverType: 2,
    //   originSongSimpleData: {
    //     songId: 113811,
    //     name: '花园街的流星',
    //     artists: [
    //       {
    //         id: 3699,
    //         name: '李克勤'
    //       }
    //     ],
    //     albumMeta: {
    //       id: 11174,
    //       name: "Let's Celebrate"
    //     }
    //   },
    //   tagPicList: null,
    //   resourceState: true,
    //   version: 717,
    //   songJumpInfo: null,
    //   entertainmentTags: null,
    //   awardTags: null,
    //   displayTags: null,
    //   single: 0,
    //   noCopyrightRcmd: null,
    //   mv: 0,
    //   rtype: 0,
    //   rurl: null,
    //   mst: 9,
    //   cp: 0,
    //   publishTime: 1388505600004
    // }
  ],
  playSongIndex: -1,
  playMode: 0 //0 顺序播放 1 随机播放 2 单曲循环
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
    },
    changeLyricAction(state, action) {
      state.currentSongLyric = action.payload
    },
    changeLyricIndexAction(state, action) {
      state.LyricIndex = action.payload
    },
    changeplaySongIndexAction(state, action) {
      state.playSongIndex = action.payload
    },
    changeplaySongListAction(state, action) {
      state.playSongList = action.payload
    },
    changePlayModeAction(state, action) {
      state.playMode = action.payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeCurrentSongUrlAction,
  changeLyricAction,
  changeLyricIndexAction,
  changeplaySongIndexAction,
  changeplaySongListAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
