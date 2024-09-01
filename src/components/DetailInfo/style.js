import styled from 'styled-components'

export const DetailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  width: 60%;

  .detail_sec_title {
    font-size: 64px;
    font-weight: 900;
  }

  .detail_sec_position {
    display: flex;
    align-items: center;
    gap: 12px;

    .detail_sec_position_list {
      padding: 8px 12px;
      background-color: red;
      color: #fff;
      border-radius: 12px;
    }
  }

  .detail_sec_des {
    line-height: 2;
  }

  button {
    padding: 12px;
    border-radius: 6px;

    img {
      fill: #fff;
      stroke: #fff;
    }
  }
`
