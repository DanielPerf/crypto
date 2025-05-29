import { Layout, Select, Space, Button } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";

const headerStyle = {
  textAlign: "center",
  height: 60,
  width: "100%",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

function handleSelect(value) {
  console.log(value)
}



export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const { crypto } = useCrypto();
  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open = {select}
        onClick={() => setSelect((prev) => !prev)}
        style={{ width: "25%" }}
        onSelect={handleSelect}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{width: '20px'}} src={option.data.icon} alt={option.data.label} />
            { option.data.label }
          </Space>
        )}
      ></Select>
      <Button type="primary">Add asset</Button>
    </Layout.Header>
  );
}
