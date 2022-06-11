import styled from "styled-components";


export const Container = styled.div`
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
export const SwitchCustomContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 100px;

  cursor: pointer;
  font-size: 22px;
  user-select: none;
`;
export const SwitchCustomInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ span {
    background-color: dodgerblue;
  }
  &:checked ~ span:after {
    left: 43px;
  }
`;
export const SwitchCustomSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 33px;
  width: 70px;
  border-radius: 25px;
  background-color: darkgray;
  transition: background-color 0.15s ease-in;
  &:after {
    content: "";
    position: absolute;
    left: 5px;
    top: 5px;
    width: 23px;
    height: 23px;
    border-radius: 25px;
    background: white;
    transition: left 0.15s ease-in;
  }
`;
