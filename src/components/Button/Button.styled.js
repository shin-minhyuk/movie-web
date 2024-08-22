import styled, { css } from "styled-components";

export const G_Button = styled.button`
  font-weight: 600;
  cursor: pointer;

  ${({ type }) => {
    switch (type) {
      case "modal":
        return css`
          width: 100%;
          padding: 10px 0;
          border-radius: 4px;
        `;
      case "header":
        return css`
          border: none;
          padding: 6px 16px;
          border-radius: 6px;
        `;
    }
  }}

  ${({ color }) => {
    switch (color) {
      case "red":
        return css`
          background-color: red;
          color: white;
        `;
      case "white":
        return css`
          background-color: transparent;
          color: red;

          &:hover {
            background-color: #ff000010;
          }
        `;
    }
  }}
`;
