import styled from 'styled-components';

import { lighten } from 'polished';

export const Container = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  background-color: #37005c;
  box-shadow: 0px 5px 5px rgba(191, 84, 182, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin: 40px auto 35px auto;
  transition: background-color 0.3s;

  color: #fff;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: ${lighten(0.1, '#37005c')};
  }
`;
