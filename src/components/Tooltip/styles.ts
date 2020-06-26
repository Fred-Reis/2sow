import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 90px;
    background: #47005c;
    padding: 8px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    opacity: 0;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;

    &::before {
      content: '';
      border-style: solid;
      border-color: #47005c transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
