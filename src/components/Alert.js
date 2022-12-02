const Alert = (props) => {
  return <div className={`alert ${props.className}`}>{props.message}</div>;
};

export default Alert;
