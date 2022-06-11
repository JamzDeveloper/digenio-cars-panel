import styled from "styled-components";

export const ContainerDataProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 2rem;
`;

export const ContainerDataPrincipal = styled.div`
  display: flex;
  justify-content: space-around;
  justify-content: space-around;
  align-items: center;
`;
export const ContainerDataPrincipalLeft = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  height: 100%;
`;

export const ContainerMedia = styled.div`
  width: 500px;
 padding: 2rem;
  align-self: center;
  display: flex;
  justify-content: center;
  div{
      display: inline-block;
  }
`;
export const Title = styled.h1`
  font-size: 2.1rem;
  margin: 0;
  padding: 0;
`;
export const ContainerFirstRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  margin-bottom: 0.3rem;
`;
export const ContainerTitle = styled.div`
  display: flex;
  width: 75%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Subtitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  p {
    margin: 0;
    font-size: 1.1rem;
  }
`;
export const SaleStatuContainer = styled("div")<{ saleStatus: boolean }>`
  background: ${({ saleStatus }) =>
    saleStatus ? "rgb(255, 0, 128)" : "#17C964"};
  border-radius: 15px;
  padding: 7px;
  color: #fff;
  p {
    margin: 0;
    font-weight: 500;
  }
`;

export const ContainerDescription = styled.div`
  display: flex;
  font-size: 1.2rem;
`;
export const ContainerDataUser = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 0.3rem;
`;

export const ContainerDetailProduct = styled.div`
  display: flex;

  justify-content: space-around;
  font-size: 1.2rem;
`;

export const ContainerFeatures = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const ContainerImages = styled.div`
display: flex;
width: 100%;
align-items: center;
justify-content: center;
`;