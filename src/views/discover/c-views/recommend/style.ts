import styled from 'styled-components'

export const RecommendWraper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;

    > .left {
      padding: 20px;
      width: 729px;
    }

    > .right {
      margin-left: 1px;
      width: 250px;

      /* background-image: url('https://music.163.com/style/web2/img/dis_vip_card.png'); */

      .vip_card {
        .vip_card_img {
          width: 250px;
          height: 100%;
        }
      }
    }
  }
`

export const RecommendLeft = styled.div`
  padding: 20px;
  width: 729px;
`

export const RecommendRight = styled.div`
  margin-left: 1px;
  width: 250px;
`
