import styled from "styled-components";

export const NavContainer = styled("nav")<{ stateNavbar: boolean }>`
  position: fixed;
  transition: all 0.5s;
  width: ${(props) => (props.stateNavbar ? "300px" : "150px")};
  height: 100vh;
  background-color: #0070f3;
  box-shadow: 3px 0px 6px 0px rgba(246, 246, 246, 0.75);
`;
export const ContainerLogo = styled.div`
  margin-top: 20px;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  padding-left: 27px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  p {
    margin-left: 25px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
  }
`;

export const Wrapper = styled.div`
  z-index: 1;
`;

export const LinkP = styled("p")<{ stateRoute: boolean; stateNavbar: boolean }>`
  color: ${(props) => (props.stateRoute ? " #0070F3" : "#fff")};
  display: ${(props) => (!props.stateNavbar ? "none" : "")};
`;
