import styled from "styled-components";

export const SectionDataUser = styled.section`
  display: flex;

  justify-content: space-around;
  width: 100%;
  margin-top: 16px;
`;

export const ContainerDataUser = styled.div`
  width: 50%;
`;
export const StateUser = styled("div")<{ state: boolean }>`
  display: flex;
  margin-top: 16px;
  padding: 8px;
  align-items: center;
  background-color: ${(props) => (props.state ? "#17C964" : "#F21361")};
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 8px;
`;

export const ContainerElementUserData = styled.div`
  display: flex;

  padding: 8px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      margin-left: 8px;
    }
  }
`;

export const StyleProduct = {
  backgroundColor: "#0070F3",
  color: "white",
  padding: "8px",
  borderRadius: "9px",
};
