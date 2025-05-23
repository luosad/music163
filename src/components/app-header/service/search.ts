import myRequest from '@/service/axios'

// 根据关键词获取搜索结果（网易云接口示例）
export function getSearchResult(keywords: string) {
  return myRequest({
    url: '/search',
    params: {
      keywords
    }
  })
}
