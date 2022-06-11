import styled from "styled-components";

export const ContainerHeader = styled("div")<{ stateLateral: boolean }>`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  padding-right: 4px;
  padding-left: 4px;
  margin-top: -12px;
  width: ${(props) => (props.stateLateral ? "81%" : "90%")};
  border-bottom: 2px solid #e6e6e6;
  transition: all 0.5s;
  z-index: 1000;
  background-color: #fff;
`;

export const ContainerMenuBurguer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  width: 10rem;
  svg:active {
    transform: scale(1.1);
  }
  p {
    font-size: 20px;
    text-align: center;
    font-weight: 500;
  }
`;
