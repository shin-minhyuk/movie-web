import styled from 'styled-components'

export const ProfileModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .header_toggle {
    position: absolute;
    right: 24px;
    top: 68px;
    width: 140px;
    padding: 8px 16px;
    text-align: center;
    background-color: var(--header-user);
    border-radius: 4px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
    opacity: 0;

    display: flex;
    flex-direction: column;
    gap: 14px;

    div {
      color: var(--color);
      cursor: pointer;

      &:hover {
        opacity: 0.5;
        transition: 0.3s;
      }
    }
  }

  .header_toggle.show {
    opacity: 1;
    pointer-events: auto;
  }
`
