import { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { products } from "src/_mock/products";
import ProductCard from "../product-card";
import ProductCartWidget from "../product-cart-widget";
import Iconify from "src/components/iconify";
import { InputNumber, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button as MyButton } from "antd";
import { message, numberMessage } from "src/_mock/formProduct";
import ShopProductCard from "../product-card";
import { useMutation } from "react-query";
import { api, api2 } from "src/api/mainfetch";
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [open, setOpen] = useState(false);
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(false);

  const { isLoading, isError, data, error, mutate } = useMutation({
    mutationFn: (values) => {
      const formDataToSend = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (key !== "imgUrl") formDataToSend.append(key, value);
      }

      formDataToSend.append("imgUrl", values.imgUrl[0].originFileObj);

      return api2.post("/product", formDataToSend);
    },
  });

  const fetchData = async () => {
    try {
      setloading(true);
      const response = await api.get("/product");
      setproduct(response.data.data.value);
      setloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    });
  };
  const handleCancel = (value) => {
    setOpen(!open);
  };

  const onFinish = (values) => {
    mutate(values);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  if (isLoading) {
    return "Loading...";
  }
  if (loading) {
    return "Loading...";
  }
  if (isError) {
    return "Error..";
  }
  if (error) {
    return "Error..";
  }

  if (data && data?.status == 200) {
    return (
      <div className="text-center text-green-400 font-bold text-4xl">
        <p> Successfully Product add</p>
        <Button
          className="border border-red-500"
          onClick={() => window.location.reload()}
        >
          Go to Product Page
        </Button>
      </div>
    );
  }

  return (
    <Container>
      {open && (
        <div>
          <Modal
            title="Product Add Form"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null} // Remove footer if you don't want default buttons
          >
            <>
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="vertical"
                style={{
                  maxWidth: 600,
                }}
                onFinish={onFinish}
              >
                {message.map((v) => (
                  <Form.Item
                    label={v.label}
                    name={v.name}
                    rules={[
                      {
                        pattern: v?.pattern,
                        required: true,
                        message: v.message,
                      },
                    ]}
                  >
                    {v.label == "Description" ? (
                      <TextArea rows={2} maxLength={100} />
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                ))}

                {numberMessage.map((v) => (
                  <Form.Item
                    label={v.label}
                    name={v.name}
                    rules={[
                      {
                        pattern: v?.pattern,
                        required: true,
                        message: v.message,
                      },
                    ]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                ))}

                <Form.Item
                  label="Upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  name="imgUrl"
                  rules={[
                    {
                      required: true,
                      message: "input Image",
                    },
                  ]}
                >
                  <Upload maxCount={1} listType="picture-card">
                    <button
                      style={{
                        border: 0,
                        background: "none",
                      }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </button>
                  </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <MyButton
                    onClick={() => handleCancel()}
                    className="border border-green-500 focus:border-red-400"
                  >
                    cancel
                  </MyButton>
                  <MyButton primary htmlType="submit" className="ms-4">
                    Submit
                  </MyButton>
                </Form.Item>
              </Form>
            </>
          </Modal>
        </div>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Products</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpen(true)}
        >
          Add New Product
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {product.map((value, idx) => (
          <Grid key={idx} xs={12} sm={6} md={3}>
            <ShopProductCard product={value} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
