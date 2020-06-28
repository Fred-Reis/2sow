import styled, { css } from 'styled-components';
import { lighten, shade } from 'polished';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  description: boolean;
}

const toastTypes = {
  info: css`
    background: #afbaca;
    color: #47005c;
  `,

  error: css`
    background: ${lighten(0.2, '#c53030')};
    color: ${shade(0.5, '#c53030')};
  `,

  success: css`
    background: ${lighten(0.3, '#00c94d')};
    color: ${shade(0.5, '#00c94d')};
  `,
};

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 50px 30px;
  overflow: hidden;

  z-index: 2;
`;

export const Toast = styled.div<ToastProps>`
  width: 320px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 7px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 5px;
  }

  ${(props) => toastTypes[props.type || 'info']}

  > svg {
    margin: 1px 6px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
    }
  }

  button {
    background: transparent;

    border: none;
    position: absolute;
    opacity: 0.6;
    right: 16px;
    top: 19px;
    color: inherit;
  }

  ${(props) =>
    !props.description &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
