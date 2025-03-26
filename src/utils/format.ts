export function formateCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  }
  return count
}

export function formateImgUrl(
  url: string,
  width: number,
  height: number = width
) {
  return url + `?param=${width}y${height}`
}
