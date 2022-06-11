import styled from "styled-components";

export const ContainerCard = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;
  width: 350px;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e6e6e6;
`;
export const ContainerStatus = styled.div`
  position: absolute;
  top: 10px;

`;
export const ContainerCardActions = styled("div")<{ stateMenu: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  top: 10px;
  margin-right: ${(props) => (props.stateMenu ? "0px" : "9px")};
  div {
    transform: ${(props) =>
      props.stateMenu ? "rotate(0deg)" : "rotate(-90deg)"};
    transition: 0.3s ease-in-out;
    display: inline-block;
    cursor: pointer;
  }
`;

export const ContainerMenuOptions = styled("ul")<{ stateMenu: boolean }>`
  transition: 10s ease-in-out;
  display: ${(props) => (props.stateMenu ? "block" : "none")};
  li {
    transition: 30s ease-in-out;
    svg {
      transition: 40s ease-in-out;
    }
  }
`;

export const ContainerImg = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  align-items: center;
  width: 100%;

  img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

export const ContainerNamePlan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
  p {
    font-size: 24px;
    font-weight: bold;
    color: #303972;
    padding-bottom: 0px;
  }
  span{
    font-size: 16px
    margin-top: -2px;
  }
`;
export const ContainerDescriptionPlan = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
export const ContainerDescriptionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 10px 0px 10px;
`;

export const ElementDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-weight: 500;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 10px;
    }
  }
`;

export const ContainerPrice = styled.div`
  margin-top: -15px;

  display: flex;
  paddding: 0px;
  justify-content: center;
  p {
    font-weight: 500;
    font-size: 25px;
  }
`;

export const ButtonSeeMore = styled.button`
  background: #303972;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover { 
  
  }
  &:active {
    background: #fff; 
    color: #303972;
    transform: scale(0.95);
    
`;

export const MoreInformation = styled("div")<{ stateMoreInformation: boolean }>`
  display: ${(props) => (props.stateMoreInformation ? "flex" : "none")};
  transition: 0.3s ease-in-out;

  flex-direction: column;
`;
