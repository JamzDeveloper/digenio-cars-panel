const Time = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.5 0C4.986 0 0.5 4.486 0.5 10C0.5 15.514 4.986 20 10.5 20C16.014 20 20.5 15.514 20.5 10C20.5 4.486 16.014 0 10.5 0ZM10.5 18C6.089 18 2.5 14.411 2.5 10C2.5 5.589 6.089 2 10.5 2C14.911 2 18.5 5.589 18.5 10C18.5 14.411 14.911 18 10.5 18Z"
        fill={props.color ? props.color : "black"}
      />
      <path d="M11.5 5H9.5V11H15.5V9H11.5V5Z" fill={props.color ? props.color : "black"}/>
    </svg>
  );
};
export default Time;
