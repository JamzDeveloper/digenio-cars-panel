const Store = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
      <path
        d="M3.99878 7H1.99859V15C1.99859 15.5531 2.44551 16 2.99868 16H10.9994C11.5526 16 11.9995 15.5531 11.9995 15V10H15.9999V7H3.99878ZM19.8315 4.44375L17.1656 0.44375C16.9781 0.165625 16.6656 0 16.3312 0H3.6675C3.33309 0 3.02056 0.165625 2.83617 0.44375L0.170291 4.44375C-0.273501 5.10937 0.201544 6 1.00162 6H19.0002C19.7971 6 20.2722 5.10937 19.8315 4.44375ZM15.9999 15.5C15.9999 15.775 16.2249 16 16.5 16H17.5001C17.7751 16 18.0001 15.775 18.0001 15.5V7H15.9999V15.5Z"
        fill="white"
      />
    </svg>
  );
};

export default Store;
