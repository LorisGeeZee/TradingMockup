import { useInterval } from "primereact/hooks";
import styled from "styled-components";
import TrendGraph from "../components/Trendgraph";
import { generateStockPrice } from "../utils/generateStockprice";
import { Link } from "react-router-dom";

import { useMoneyStore } from "../stores/useMoneyStore";
import { useStocksStore } from "../stores/useStocksStore";

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

const StyledButton = styled(Link)`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: rgb(255, 99, 132);
  color: #fff;
  font-size: 16px;
  margin-top: 2rem;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: rgb(230, 79, 112);
  }
`;

const StyledStockItem = styled.div`
  margin-left: 10px;
`;

const StyledGraphContainer = styled.div`
  width: 500px;
  height: 300px;
`;

const Dashboard = () => {
  const money = useMoneyStore((state) => state.money);
  const stocks = useStocksStore((state) => state.stocks);
  const setStocks = useStocksStore((state) => state.setStocks);

  console.log("money", money);
  console.log("stocks", stocks);

  const updateStockPrices = () => {
    if (stocks.length > 0) {
      return stocks.map((stock) => {
        const newPrice = generateStockPrice(stock.name);

        return { ...stock, value: newPrice };
      });
    }
  };

  const handleUpdatePrices = () => {
    const updatedStocks = updateStockPrices();
    if (updatedStocks) setStocks(updatedStocks);
  };

  useInterval(handleUpdatePrices, 5000);

  const calculateTotalValue = () => {
    const totalValue = stocks.reduce((total, stock) => {
      return total + stock.value * stock.amount;
    }, 0);

    return (Math.round(totalValue * 100) / 100).toFixed(2);
  };

  const moneyFormatted = (Math.round(money * 100) / 100).toFixed(2);

  return (
    <StyledContainer>
      <div>Dashboard</div>
      <div>Money Available: {moneyFormatted}$</div>
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
      <StyledButton to={"/trade"}>Trade Stocks</StyledButton>
    </StyledContainer>
  );
};

export default Dashboard;
