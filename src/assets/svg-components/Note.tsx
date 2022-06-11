const Note = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5 3C12.9045 3 13.6067 3 14.1111 3.33706C14.3295 3.48298 14.517 3.67048 14.6629 3.88886C15 4.39331 15 5.09554 15 6.5V16C15 17.8856 15 18.8284 14.4142 19.4142C13.8284 20 12.8856 20 11 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16V6.5C1 5.09554 1 4.39331 1.33706 3.88886C1.48298 3.67048 1.67048 3.48298 1.88886 3.33706C2.39331 3 3.09554 3 4.5 3"
        stroke={props.color ? props.color : "black"}
        strokeWidth="2"
      />
      <path
        d="M5 3C5 1.89543 5.89543 1 7 1H9C10.1046 1 11 1.89543 11 3C11 4.10457 10.1046 5 9 5H7C5.89543 5 5 4.10457 5 3Z"
        stroke={props.color ? props.color : "black"}
        strokeWidth="2"
      />
      <path
        d="M5 10L11 10"
        stroke={props.color ? props.color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 14L9 14"
        stroke={props.color ? props.color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default Note;