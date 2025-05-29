import { useState } from "react";
import { Select, Space, Typography, Flex, Divider } from "antd";
import { useCrypto } from "../context/crypto-context";

export default function AddAssetForm() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);

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
  return (
    <form action="">
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: "40px", marginRight: "10px" }}
        />
        <Typography.Title level={2} style={{ marginBottom: "5px" }}>
          {coin.name}
        </Typography.Title>
      </Flex>
      <Divider></Divider>
    </form>
  );
}
