import styled, { css } from 'styled-components';
import { shade } from 'polished';

import Tooltip from '../Tooltip';

interface InputProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<InputProps>`
  width: 100%;
  background: #eee9fd;
  border: 2px solid #afbaca;
  box-shadow: 0px 4px 4px rgba(175, 186, 202, 0.25);
  border-radius: 5px;
  padding: 10px;

  display: flex;
  align-items: center;
  flex-direction: row !important;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${shade(0.3, '#afbaca')};
    `}
    &
    + p {
    margin-top: 30px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #2d374e;
    font-weight: bold;
    width: 100% !important;

    &::placeholder {
      color: #8497ae;
    }
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 7px;
  width: 20px !important;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
