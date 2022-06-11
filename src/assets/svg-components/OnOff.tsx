const OnOff = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.34315 3.34315C2.22433 4.46197 1.4624 5.88743 1.15372 7.43928C0.845036 8.99113 1.00346 10.5997 1.60896 12.0615C2.21447 13.5233 3.23985 14.7727 4.55544 15.6518C5.87103 16.5308 7.41775 17 9 17C10.5823 17 12.129 16.5308 13.4446 15.6518C14.7602 14.7727 15.7855 13.5233 16.391 12.0615C16.9965 10.5997 17.155 8.99112 16.8463 7.43928C16.5376 5.88743 15.7757 4.46197 14.6569 3.34315"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={props.color ? props.color : "black"}
      />
      <path
        d="M9 5L9 1"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={props.color ? props.color : "black"}
      />
    </svg>
  );
};

export default OnOff;