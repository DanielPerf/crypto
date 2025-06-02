import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart"
import AssetsTable from "../AssetsTable"

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  // const sum = +(assets.map(asset => {
  //       const coin = crypto.find(c => c.id === asset.id)
  //       return asset.amount * coin.price
  //   }).reduce((acc, v) => acc += v, 0).toFixed(2))

  const sum = assets
    .map((asset) => asset.amount * cryptoPriceMap[asset.id])
    .reduce((acc, v) => (acc += v), 0)
    .toFixed(2);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio :{sum}$
      </Typography.Title>
      <PortfolioChart></PortfolioChart>
      <AssetsTable></AssetsTable>
    </Layout.Content>
  );
}
