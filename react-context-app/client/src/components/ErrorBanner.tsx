const ErrorBanner = ({ message }: { message: string }) => {
  let emsg = message || "에러입니다.";

  return <div style={{ backgroundColor: "red" }}>{message}</div>;
};

export default ErrorBanner;
