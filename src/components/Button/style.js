import styled, { css } from 'styled-components'

export const ButtonWrapper = styled.div`
  font-weight: 600;
  cursor: pointer;

  ${({ $position }) => {
    switch ($position) {
      case 'modal':
        return css`
          width: 100%;
          padding: 16px 0;
          border-radius: 6px;
        `
      case 'header':
        return css`
          border: none;
          padding: 6px 16px;
          border-radius: 6px;
        `
    }
  }}

  ${({ color }) => {
    switch (color) {
      case 'red':
        return css`
          background-color: red;
          color: white;
        `
      case 'white':
        return css`
          background-color: transparent;
          color: red;

          &:hover {
            background-color: #ff000010;
          }
        `
    }
  }}
`
