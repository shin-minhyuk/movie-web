import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  .header_container {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;

    .header_inner {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 10px 24px;

      .header_auth {
        display: flex;
        align-items: center;
        gap: 30px;

        .header_user_container {
          position: relative;

          .header_user {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            cursor: pointer;

            img {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
`
