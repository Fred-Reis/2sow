import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';
import { Form } from '@unform/web';

import backgroundImg from 'src/assets/backgroung-dashboard.jpg';

import Button from 'src/components/Button';

const fromRigth = keyframes`
  from{
    opacity:0;
    transform: translateX(50px);
  }
  to{

    opacity:1;
    transform: translateX(0);
  }
`;

const fromBottom = keyframes`
  from{
    opacity:0;
    transform: translateY(50px);
  }
  to{

    opacity:1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  background: url(${backgroundImg}) no-repeat left bottom;
  background-size: cover;
  background-attachment: fixed;

  align-items: center;
  justify-content: center;

  @media (max-height: 750px) {
    padding-top: 100px;
  }

  @media (max-width: 780px) {
    height: 100%;
    background-attachment: fixed;
  }

  img {
    position: absolute;
    top: 15px;
    right: 15px;

    animation: ${fromRigth} 1s;
  }
`;

export const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;

  background-color: #fff;
  border-radius: 3px;
  padding: 20px;
  width: 700px;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

  animation: ${fromBottom} 1s;

  @media (max-width: 780px) {
    display: flex;
    flex-direction: column;

    margin: 70px 50px;
  }

  h2 {
    color: #2d374e;
    margin-bottom: 24px;
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
  }

  > div {
    flex: 1;
    display: flex;
    flex-direction: row;
    background-color: #f4fff3;

    @media (max-width: 780px) {
      flex-direction: column;
    }
  }

  label {
    color: #8497ae;
    font-weight: bold;
    margin: 30px 0 5px 5px;
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
      margin-right: 10px;
    }

    &:hover {
      color: ${lighten(0.3, '#1E0041')};
    }
  }
`;

export const FormSection = styled.section`
  flex: 1;
  flex-direction: column;
  display: flex;
  margin: 10px;

  div {
    display: flex;
    flex-direction: row;

    @media (max-width: 780px) {
      flex-direction: column;
    }

    div {
      width: 100%;
      display: flex;
      flex-direction: column;

      & + div {
        margin-left: 10px;

        @media (max-width: 780px) {
          margin: 0;
        }
      }
    }
  }
`;

export const NewButton = styled(Button)`
  width: 60%;
`;
