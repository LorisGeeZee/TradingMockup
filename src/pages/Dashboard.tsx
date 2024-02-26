import { useState } from "react";
import { Stock } from "../types/Stocks";
import { useInterval } from "primereact/hooks";
import styled from "styled-components";
import TrendGraph from "../components/Trendgraph";
import { generateStockPrice } from "../utils/generateStockprice";

const StyledStockList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 3rem;
  border-radius: 5rem;
  background-color: black;
`;

const StyledStockItem = styled.div`
  margin-left: 10px;
`;

const StyledGraphContainer = styled.div`
  width: 500px;
  height: 300px;
`;

const Dashboard = () => {
  const [money, setMoney] = useState(100000);
  const [stocks, setStocks] = useState<Stock[]>([
    { value: 10, amount: 5, name: "Luft Hansa" },
    { value: 15, amount: 3, name: "DB" },
    { value: 20, amount: 2, name: "Tesla" },
  ]);

  const updateStockPrices = () => {
    return stocks.map((stock) => {
      const newPrice = generateStockPrice(stock.name);

      return { ...stock, value: newPrice };
    });
  };

  const handleUpdatePrices = () => {
    const updatedStocks = updateStockPrices();
    setStocks(updatedStocks);
  };

  useInterval(handleUpdatePrices, 5000);

  const calculateTotalValue = () => {
    const totalValue = stocks.reduce((total, stock) => {
      return total + stock.value * stock.amount;
    }, 0);

    return (Math.round(totalValue * 100) / 100).toFixed(2);
  };

  console.log(stocks);

  return (
    <StyledContainer>
      <div>Dashboard</div>
      <div>Money Available: {money}$</div>
      <StyledStockList>
        Stocks Owned:
        {stocks.map((stock, index) => (
          <StyledStockItem key={index}>
            {stock.name} x {stock.amount}
          </StyledStockItem>
        ))}
      </StyledStockList>
      <div>Stock Value: {calculateTotalValue()}$</div>
      <StyledGraphContainer>
        <TrendGraph stocks={stocks} />
      </StyledGraphContainer>
    </StyledContainer>
  );
};

export default Dashboard;
