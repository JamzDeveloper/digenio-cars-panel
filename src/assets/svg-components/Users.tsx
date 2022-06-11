const Users = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      width="38"
      height="26"
      viewBox="0 0 38 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.57143 11.1429C7.62009 11.1429 9.28571 9.47723 9.28571 7.42857C9.28571 5.37991 7.62009 3.71429 5.57143 3.71429C3.52277 3.71429 1.85714 5.37991 1.85714 7.42857C1.85714 9.47723 3.52277 11.1429 5.57143 11.1429ZM31.5714 11.1429C33.6201 11.1429 35.2857 9.47723 35.2857 7.42857C35.2857 5.37991 33.6201 3.71429 31.5714 3.71429C29.5228 3.71429 27.8571 5.37991 27.8571 7.42857C27.8571 9.47723 29.5228 11.1429 31.5714 11.1429ZM33.4286 13H29.7143C28.6929 13 27.7701 13.4121 27.0969 14.0795C29.4357 15.3621 31.0955 17.6777 31.4554 20.4286H35.2857C36.3129 20.4286 37.1429 19.5987 37.1429 18.5714V16.7143C37.1429 14.6656 35.4772 13 33.4286 13ZM18.5714 13C22.1638 13 25.0714 10.0924 25.0714 6.5C25.0714 2.90759 22.1638 0 18.5714 0C14.979 0 12.0714 2.90759 12.0714 6.5C12.0714 10.0924 14.979 13 18.5714 13ZM23.0286 14.8571H22.5469C21.3397 15.4375 19.9991 15.7857 18.5714 15.7857C17.1437 15.7857 15.8089 15.4375 14.596 14.8571H14.1143C10.4232 14.8571 7.42857 17.8518 7.42857 21.5429V23.2143C7.42857 24.7522 8.67634 26 10.2143 26H26.9286C28.4665 26 29.7143 24.7522 29.7143 23.2143V21.5429C29.7143 17.8518 26.7196 14.8571 23.0286 14.8571ZM10.046 14.0795C9.37277 13.4121 8.45 13 7.42857 13H3.71429C1.66562 13 0 14.6656 0 16.7143V18.5714C0 19.5987 0.829911 20.4286 1.85714 20.4286H5.6817C6.04732 17.6777 7.70714 15.3621 10.046 14.0795Z"
        fill={props.color ? props.color : "#fff"}
      />
    </svg>
  );
};

export default Users;
