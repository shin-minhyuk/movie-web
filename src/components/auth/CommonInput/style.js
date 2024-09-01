import styled from 'styled-components'

export const InputWrapper = styled.div`
  width: 100%;

  input {
    width: 100%;
    padding: 16px 20px;
    border-radius: 6px;
    background-color: transparent;
    border: 1px solid #444;

    &:hover {
      outline: 1.5px solid #fff;
    }

    &:focus {
      outline: 1.5px solid #5fbb73;
    }
  }

  input.error {
    border: 1px solid #f44336;

    &:focus {
      outline: 1.5px solid #f44336;
    }
  }
`
