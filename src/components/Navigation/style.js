import styled from 'styled-components'

export const NavWrapper = styled.div`
  .header_nav {
    display: flex;
    align-items: center;
    gap: 20px;

    .header_nav_link {
      text-decoration: none;
      padding: 6px 16px;
      cursor: pointer;

      &:hover {
        border-radius: 4px;
        transition: 0.3s;
      }
    }

    .header_theme_color {
      width: 48px;
      height: 48px;
      border-radius: 24px;
      background-color: transparent;
      padding: 12px;
      cursor: pointer;

      &:hover {
        border-radius: 4px;
        transition: 0.3s;
        background-color: var(--background-color);
        border-radius: 24px;
        opacity: 0.5;
      }
    }
  }

  .nav_bg_color {
    font-weight: 600;
    border: none;
    padding: 6px 16px;
    border-radius: 6px;
    background-color: red;
    color: #fff;
  }
`
