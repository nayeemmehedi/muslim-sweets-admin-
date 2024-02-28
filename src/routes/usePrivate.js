import { useSelector } from "react-redux";

const usePrivate = () => {
  
  const email = localStorage.getItem("email");
  const passwordMatch = localStorage.getItem("passwordMatch");
  const status = localStorage.getItem("status");

  console.log(email);

  const count = useSelector((state) => state.counter.value);

  if (
    (count.email == "nayeem01mehedi@gmail.com" &&
      count.status == "admin" &&
      count.passwordMatch) ||
    (email == "nayeem01mehedi@gmail.com" || passwordMatch || status == "admin")
  ) {
    return true;
  } else {
    return false;
  }
};

export default usePrivate;
