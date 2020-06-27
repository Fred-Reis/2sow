import styled from 'styled-components';
import { lighten } from 'polished';

import backgroundImg from '../../assets/background-login.png';
export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  img {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  h2 {
    font-weight: bold;
    color: #1e0041;
    margin-top: 30px;

    @media (max-width: 450px) {
      font-size: 18px;
    }
  }

  form {
    margin: 30px 0;
    background-color: #fff;
    border-radius: 3px;
    padding: 20px;
    width: 340px;
    height: 470px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

    @media (max-width: 450px) {
      width: 80%;
    }

    h1 {
      color: #2d374e;
      margin-bottom: 24px;
      text-align: center;
      font-size: 40px;
      margin-top: 10px;
      font-weight: 800;
    }

    > div {
      flex: 1;
      background-color: #f4fff3;
      padding: 10px;

      label {
        color: #8497ae;
        font-weight: bold;
        margin: 20px 0 5px 5px;
      }

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        text-decoration: none;
        font-size: 13px;
        font-weight: bold;
        color: #1e0041;
        transition: color 0.3s;

        svg {
          margin-left: 10px;
        }

        &:hover {
          color: ${lighten(0.3, '#1E0041')};
        }
      }
    }
  }
`;

export const Background = styled.img`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`;
