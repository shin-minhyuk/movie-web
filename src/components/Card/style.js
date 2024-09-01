import styled from 'styled-components'

export const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    .card_backdrop {
      opacity: 1;
      transition: 0.3s;
    }

    .card_more {
      opacity: 1;
      transition: 0.3s;
    }
  }

  .card_backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: linear-gradient(0deg, black, transparent);
    opacity: 0;
    transition: 0.3s;
  }

  .card_more {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 12px;
    bottom: 0;
    width: 100%;
    height: max-content;
    padding: 12px;
    opacity: 0;
    transition: 0.3s;
    color: white;

    .card_more_average {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid rgb(32, 190, 98);

      span {
        font-size: 12px;
        text-align: center;
      }
    }
  }
`
