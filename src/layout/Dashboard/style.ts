import styled from "styled-components";
export const DashboardContainer = styled.div`
  display: flex;
  position: relative;
  height: 100vh;
  width: 100vw;


`;
export const ContainerContent = styled("div")<{stateNavbar:boolean}>`
transition: all 0.5s;
margin-left:  ${(props) => (props.stateNavbar ? "300px" : "150px")};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 3px 0px 6px 0px rgba(246, 246, 246, 0.75);
`;

export const  ContainerChildren = styled.div`
position: relative;
top: 74px;

`