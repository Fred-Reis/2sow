import styled from 'styled-components';

export const Container = styled.div`
  background: #d5c4ff;
  padding: 25px 0;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  z-index: 1;

  header {
    flex: 1;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      a {
        color: #1e0041;
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        transition: opacity 0.2s;
        padding-bottom: 10px;
        border: 2px solid transparent;

        display: flex;

        svg {
          margin-right: 10px;
        }

        & + a {
          margin-left: 32px;
        }
        &:hover {
          border-bottom: 2px solid #1e0041;
          opacity: 0.6;
        }
      }

      button {
        background-color: transparent;
        margin-left: 32px;
        font-size: 18px;
        font-weight: bold;
        transition: opacity 0.2s;
        padding-bottom: 10px;
        display: flex;

        border: 2px solid transparent;
        svg {
          margin-right: 10px;
        }

        &:hover {
          border-bottom: 2px solid #1e0041;
          opacity: 0.6;
        }
      }
    }
  }
`;
