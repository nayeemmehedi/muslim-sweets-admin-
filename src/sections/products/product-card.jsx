import { useState } from "react";
import { InputNumber, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button as MyButton, Popconfirm } from "antd";
import { message, numberMessage } from "src/_mock/formProduct";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { api, api2 } from "src/api/mainfetch";
import { Alert, Space } from "antd";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ShopProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState(0);

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    });
  };
  const handleCancel = (value) => {
    console.log("Clicked cancel button", value);
    setOpen(!open);
  };

  const onFinish = (values) => {
    let count = 0;
    let obj = {};

    for (const value in values) {
      if (values[value] === undefined) {
        count++;
      } else {
        let newobj = { [value]: values[value] };
        obj = { ...newobj, ...obj };
      }
    }
    setCounts(count);

    const formDataToSend = new FormData();

    for (const [key, value] of Object.entries(obj)) {
      if (key == "imgUrl") {
        formDataToSend.append("imgUrl", value[0].originFileObj);
      } else {
        formDataToSend.append(key, value);
      }
    }

    api2
      .patch("/product/" + product._id, formDataToSend)
      .then((v) =>
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        }, 2000)
      )
      .catch((err) => console.log(err));
  };

  const confirm = (id) => {
    api
      .delete("/product/" + id)
      .then((e) => window.location.reload())
      .catch((e) => console.log("error", e));
  };
  const cancel = (e) => {
    console.log(e);
  };

  const onCloseItem = () => {
    setCounts(0);
  };

  return (
    <div>
      {open && (
        <div>
          <Modal
            title="Product Update Form"
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
                  <Form.Item label={v.label} name={v.name}>
                    {v.label == "Description" ? (
                      <TextArea rows={2} />
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                ))}

                {numberMessage.map((v) => (
                  <Form.Item label={v.label} name={v.name}>
                    <InputNumber min={1} />
                  </Form.Item>
                ))}

                <Form.Item
                  label="Upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  name="imgUrl"
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

              <div>
                {counts == 6 && (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Alert
                      message="Error"
                      description="Please Add here atlest 1 item."
                      type="error"
                      closable
                      onClose={onCloseItem}
                      showIcon
                    />
                  </Space>
                )}
              </div>
            </>
          </Modal>
        </div>
      )}
      <div className="shadow-md rounded-lg font-serif">
        <img src={product?.imgUrl} className="rounded-lg" alt="" />
        <div className="ms-3 my-2">
          <p>Name : {product?.englishName}</p>
          <p>Bangla : {product?.banglaName}</p>
          <p>Price: {product?.price} tk</p>
          <p>Price: {product?.rating} </p>
        </div>
        <div className="flex justify-between w-[70%]  ">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(product?._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button className="px-2 py-1 rounded m-3 border border-green-900 hover:border-yellow-500  hover:bg-teal-700 hover:text-white flex font-mono">
              <MdDeleteForever className="mt-1" />
              Delete{" "}
            </button>
          </Popconfirm>

          <button
            className="px-2 py-1 rounded m-3 border border-green-900 hover:border-yellow-500  hover:bg-teal-700 hover:text-white flex font-mono"
            onClick={() => setOpen(true)}
          >
            <FaEdit className="mt-1" /> Edit{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
