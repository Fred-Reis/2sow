import styled from 'styled-components';
import { lighten, shade } from 'polished';

import backgroundImg from 'src/assets/backgroung-dashboard.jpg';
import inputImg from 'src/assets/search.svg';

export const Container = styled.div`
  min-height: 100vh;
  max-height: 100%;
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
  background-attachment: fixed;
`;

export const Content = styled.div`
  display: flex;
  padding: 150px 70px 50px 50px;
`;

export const CardProfile = styled.div`
  display: flex;
  position: fixed;
  top: 150px;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 350px;
  padding: 45px 30px 20px 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  }

  strong {
    color: #2d374e;
    font-size: 25px;
    margin-top: 15px;
  }

  button {
    margin: 20px 0;
  }
`;

export const TableContainer = styled.section`
  flex: 1;
  margin-left: 300px;

  input {
    position: fixed;
    right: 50px;
    top: 115px;
    z-index: 1;

    background: url(${inputImg}) no-repeat scroll 6px 6px;
    background-color: #eee9fd;
    border: 0;
    color: #2d374e;
    padding: 10px 10px 10px 35px;

    font-weight: bold;
    width: 300px;
    border: 2px solid #afbaca;
    box-shadow: 0px 4px 4px rgba(175, 186, 202, 0.25);
    border-radius: 5px;

    &:focus {
      border-color: ${lighten(0.2, '#afbaca')};
    }
  }

  ul {
    flex: 1;
    width: 100%;

    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    margin: 30px;
    padding: 20px;
    /* z-index: -2; */

    h1 {
      color: #1e0041;
      margin: 0 0 20px 20px;
      font-size: 25px;
      font-weight: bold;
    }

    li {
      display: flex;
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      align-items: center;
      position: relative;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
      z-index: 0;

      img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
      }

      div {
        flex: 1;

        margin-left: 20px;
      }

      label {
        color: #2d374e;
        font-size: 16px;
        font-weight: bold;
      }

      p {
        color: #8497ae;
        font-size: 18px;
        margin-left: 5px;
        margin-top: 7px;
      }

      & + li {
        margin-top: 15px;
      }
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  height: 100%;

  width: 50px;

  button {
    background-color: ${lighten(0.2, '#c53030')};
    color: ${shade(0.5, '#c53030')};
    border: none;
    flex: 1;
    border-radius: 0 9px 0 0;
    height: 50%;
    transition: background-color 0.25s;

    &:hover {
      background-color: ${lighten(0.1, '#c53030')};
      color: ${shade(0.6, '#c53030')};
    }

    & + button {
      background-color: ${lighten(0.4, '#00c94d')};
      color: ${shade(0.5, '#00c94d')};
      border-radius: 0 0 9px 0;
      transition: background-color 0.25s;

      &:hover {
        background-color: ${lighten(0.2, '#00c94d')};
        color: ${shade(0.5, '#00c94d')};
      }
    }
  }
`;
