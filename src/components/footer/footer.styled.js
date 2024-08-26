import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  background-color: var(--modal-bg-color);
  margin-top: 100px;

  nav {
    display: flex;
    align-items: center;

    a {
      background-color: transparent;
      padding: 6px 16px;
      color: var(--color);

      &:hover {
        background-color: rgba(255, 0, 0, 0.1);
      }
    }
  }
`;
