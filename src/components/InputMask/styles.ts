import styled, { css } from 'styled-components';

import ReactInputMask from 'react-input-mask';

interface InputProps {
  isFocused: boolean;
}

export const Container = styled(ReactInputMask)<InputProps>`
  padding: 10px;
  width: 100%;
  background: #eee9fd;
  border: 2px solid #afbaca;
  box-shadow: 0px 4px 4px rgba(175, 186, 202, 0.25);
  border-radius: 5px;
  color: #2d374e;
  font-weight: bold;

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #2d374e;
    `}

  &::placeholder {
    color: #8497ae;
  }

  & + p {
    margin-top: 30px;
  }
`;
