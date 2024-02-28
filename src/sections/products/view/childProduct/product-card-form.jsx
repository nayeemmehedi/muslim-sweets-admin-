//product
// 1.name english
// 1.name bangla
// 2.description about product
// 3 price normal
//  3. price present
// 4.rating

import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Upload, Button } from "antd";
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProductCardForm = (props) => {

  const onFinish = (values) => {
    console.log("Success:", values);
    
  };

console.log("handleCancel->",props)




 

  return (
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
        <Form.Item
          label="Input"
          name="Input"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="TextArea"
          name="TextArea"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          name="image"
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
          <Button  className="border border-green-500 focus:border-red-400">
            cancel
          </Button>
          <Button primary htmlType="submit" className="ms-4">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default () => <ProductCardForm />;
