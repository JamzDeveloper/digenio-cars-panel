import styled from "styled-components";

export const ContainerItemLi = styled("li")<{ stateRoute: boolean }>`
  border-top-left-radius: 35px 35px;
  margin-right: -11.9px;
  border-bottom-left-radius: 35px 35px;
  transition: all 0.5s;
  cursor:pointer;
  background: ${(props) => (props.stateRoute ? "#fff" : "#0070F3")};
`;
export const ContainerLinkitem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  font-size: 18px;
  height: 60px;
  font-weight: 500;
  p {
    margin-left: 20px;
  }
`;



export const LinkP = styled("p")<{ stateRoute: boolean; stateNavbar: boolean }>`
  color: ${(props) => (props.stateRoute ? " #0070F3" : "#fff")};
  display: ${(props) => (!props.stateNavbar ? "none" : "")};
  
`;
