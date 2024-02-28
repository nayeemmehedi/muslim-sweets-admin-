import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "react-query";
import { api } from "src/api/mainfetch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginAuth } from "src/storage/loginRedux/loginSlice";


const LoginView = () => {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()


  console.log("count: " + count)


  const { isLoading, isError, data, error, mutate } = useMutation({
    mutationFn: (values) => {
      return api.post("/adminLogin", { ...values });
    },
  });

  const navigate = useNavigate();

  const onFinish = (values) => {
    mutate(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log("kahini", isLoading, isError, data, error);

  if (isLoading) {
    return "Loading...";
  }
  if (isError) {
    return "Error..";
  }
  if (data && data?.status == 200) {
    // email: 'nayeem01mehedi@gmail.com', passwordMatch: true, status: 'admin'
    const email = data?.data?.data.email
    const status = data?.data?.data.status
    const passwordMatch =  data?.data?.data.passwordMatch
    localStorage.setItem("email", email);
    localStorage.setItem("status", status);
    localStorage.setItem("passwordMatch", passwordMatch);
    
    dispatch(loginAuth({email,status,passwordMatch}))
    navigate("/")
  }

  
  return (
    <div>
      <div className="w-[40%] ms-auto me-auto ">
        <div className="py-12 font-bold text-black">Admin Login</div>

        <Form
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="w-full" />
          </Form.Item>

          <Form.Item
          // wrapperCol={{
          //   offset: 8,
          //   span: 16,
          // }}
          >
            <div className="">
              <Button
                className="border border-red-500 text-red-500  w-full"
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginView;

// .background-main{
//   background-image: url("/public/assets/background/sondes.jpeg");
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   height: 100vh; /* Set the body height to fill the viewport */

// }

// .background-main::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha value for darkness */
//   backdrop-filter: blur(10px);
// }
