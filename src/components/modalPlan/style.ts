import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;
export const ContainerColumnNewProperty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 300px;
`;
export const ContainerImage = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  button {
    position: absolute;
    top: 4px;
    right: 8px;
    z-index: 100;
    border: none;
    background: none;

    color: #fff;
    background-color: #d6d3e5;
    border-radius: 20px;
    color: #000;
    font-weight: 500;
    &:hover {
      cursor: pointer;
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

export const InputFile = styled.input`
  appearance: none;
  display: none;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  background: red;
`;

export const ContainerOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  postion relative;
  width: 180px;
  margin-top: 0px;
  label{
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    
  }
  
`;
export const Buttoncustom = styled.button`
  margin-right: 10px;
  background: transparent;
  border: 0px;
  cursor: pointer;
  z-index: 1000;
`;
export const ContainerDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const ContainerDetailsItem = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  margin: 10px;
  max-width: 600px;

  display: flex;
  border-radius: 10px;
 p
  {
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }

`;
