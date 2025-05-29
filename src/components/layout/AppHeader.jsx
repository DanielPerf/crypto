import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../coinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  textAlign: "center",
  height: 60,
  width: "100%",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const { crypto } = useCrypto();
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(true)

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);
  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
    // console.log(crypto.find((c) => c.id === value))
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
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
            <img
              style={{ width: "20px" }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      ></Select>
      <Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>

      <Modal
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin}></CoinInfoModal>
      </Modal>
      <Drawer
        destroyOnHidden
        width="600px"
        title="Add asset"
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AddAssetForm></AddAssetForm>
      </Drawer>
    </Layout.Header>
  );
}
