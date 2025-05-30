import { useState } from "react";
import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

export default function AddAssetForm({ onClose }) {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Result
        status="success"
        title="New asset added"
        subTitle={`Added ${42} of ${coin.name} by price ${24}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
          <Button key="buy" onClick={() => setSubmitted(false)}>Buy Again</Button>,
        ]}
      />
    );
  }

  const validateMessages = {
    required: "${label} is requered!",
    types: {
      number: "${label} in not valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  if (!coin) {
    return (
      <>
        <Select
          style={{ width: "100%" }}
          onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
          placeholder="Select coin"
          options={crypto.map((coin) => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
          }))}
          optionRender={(option) => (
            <Space>
              <img
                style={{ width: "20px" }}
                src={option.data.icon}
                alt={option.data.label}
              />
              {option.data.label}
            </Space>
          )}
        ></Select>
      </>
    );
  }

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    console.log(values)
    setSubmitted(true);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin}></CoinInfo>
      <Divider></Divider>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
        ></InputNumber>
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber
          onChange={handlePriceChange}
          style={{ width: "100%" }}
        ></InputNumber>
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime></DatePicker>
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }}></InputNumber>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );
}
