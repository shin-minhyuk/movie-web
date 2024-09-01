import styled from 'styled-components'

export const MainWrapper = styled.div`
  .main_slide_backdrop {
    padding-top: 50%;
    background-position: center top;
    background-size: cover;
  }

  .main_slide_backdrop_bg_left {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      90deg,
      var(--background-color),
      transparent
    );
  }

  .main_slide_backdrop_bg_bottom {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      to top,
      var(--background-color) 30%,
      transparent
    );
  }

  .detail_sec_info2_container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-left: 10rem;

    display: flex;
    align-items: center;

    .detail_sec_info2 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 36px;
      width: 60%;

      .detail_sec_title2 {
        font-size: 64px;
        font-weight: 900;
      }

      .detail_sec_position2 {
        display: flex;
        align-items: center;
        gap: 12px;

        .detail_sec_position_list2 {
          padding: 8px 12px;
          background-color: red;
          color: #fff;
          border-radius: 12px;
        }
      }

      .detail_sec_des2 {
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
    }
  }
`
