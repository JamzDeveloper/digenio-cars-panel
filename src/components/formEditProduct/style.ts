import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  width: 100%;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d6d3e5;
  margin: 0px;
`;
export const ContainerProduct = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: #d6d3e5;
  border-botton-left-radius: 15px;
  border-botton-right-radius: 15px;
  padding: 30px 0px;
`;

export const ColumnProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
`;
