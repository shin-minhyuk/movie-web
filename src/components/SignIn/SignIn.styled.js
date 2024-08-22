import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  background-color: var(--bg-color-opacity);

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  z-index: 1000;
`;

export const Inner = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  background-color: var(--background-color);
  width: 60%;
  max-width: 580px;

  padding: 24px;
  gap: 20px;

  h1 {
    font-size: 2rem;
    font-weight: 600;

    span {
      font-size: 2rem;
      font-weight: 600;
    }
  }
`;

export const LoginFrom = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;

  input {
    width: 100%;
    padding: 16px 20px;
    border-radius: 6px;
    background-color: transparent;
    border: 1px solid #444;

    &::placeholder {
    }
  }
`;

export const Kakao = styled.button`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fee500;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 6px;
  padding: 16px 0;
  font-weight: 600;
`;
