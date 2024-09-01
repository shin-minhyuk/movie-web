import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;

  .header_inner {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px 24px;

    .header_auth {
      display: flex;
      align-items: center;
      gap: 30px;

      .header_user_container {
        position: relative;
      }
    }
  }
`
