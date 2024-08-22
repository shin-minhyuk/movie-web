import styled from "styled-components";

export const Box = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-top: 94px;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Loading = styled.span`
  position: relative;
  overflow: hidden;
  display: block;
  height: 4px;
  background-color: rgb(127, 0, 0);

  span {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    transition: transform 0.2s linear;
    transform-origin: left center;
    background-color: #ff0000;
    width: auto;

    &:nth-child(1) {
      animation: 2.1s cubic-bezier(0.6, 0.8, 0.8, 0.3) 0s infinite normal none
        running animation-loading1;
    }
    &:nth-child(2) {
      animation: 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite normal
        none running animation-loading2;
    }
  }

  @keyframes animation-loading1 {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @keyframes animation-loading2 {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
`;
