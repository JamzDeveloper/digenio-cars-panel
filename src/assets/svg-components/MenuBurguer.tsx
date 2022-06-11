const MenuBurguer = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.75 4.25H13.25M2.75 12.25H13.25H2.75ZM2.75 8.25H13.25H2.75Z"
        fill={props.color ? props.color : "black"}
        stroke={props.color ? props.color : "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuBurguer;
