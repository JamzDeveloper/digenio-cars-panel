import styled from "styled-components";

export const IconButton = styled.button`
display: flex;
align-items: center;
border: none;
outline: none;
cursor: pointer;
padding: 0;
margin: 0;
background: transparent;
transition: "$default";

&:hover: {
  opacity: 0.8;
}
,
&:active: {
  opacity: 0.6;
}
`;

export const StyledBadge = styled("span")<{statusUser:boolean}>`
display: inline-block;
text-transform: uppercase;
padding: px;
margin 0 2px;
font-size:10px;
font-weight:bold;
border-radius:14px;
letter-spacing:0.6px;
line-height:1;
box-shadow:1px 2px 5px 0px rgb(0 0 0 / 5%);
align-items:center;
align-self:center;

color: ${(props)=>(props.statusUser ? "#17CDA8" : "#F21361")};

`;
