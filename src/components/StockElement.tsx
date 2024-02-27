import React from "react";
import styled from "styled-components";

import { generateStockPrice } from "../utils/generateStockprice";

import { useStocksStore } from "../stores/useStocksStore";
import { useMoneyStore } from "../stores/useMoneyStore";

const StyledStockElement = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

interface StockElementProps {
  name: string;
}

const StockElement: React.FC<StockElementProps> = ({ name }) => {
  const sellStock = useStocksStore((state) => state.decrementStockAmount);
  const buyStock = useStocksStore((state) => state.incrementStockAmount);
  const stocks = useStocksStore((state) => state.stocks);
  const money = useMoneyStore((state) => state.money);
  const updateMoney = useMoneyStore((state) => state.updateMoney);

  const preFormatedPrice = generateStockPrice(name);
  const price = (Math.round(preFormatedPrice * 100) / 100).toFixed(2);
  const priceInt = parseInt(price);

  const handleBuy = () => {
    if (priceInt < money) {
      buyStock(name, priceInt);
      updateMoney(money - priceInt);
    }
  };

  const handleSell = () => {
    if (stocks.find((stock) => stock.name === name)) {
      updateMoney(money + priceInt);
    }
    sellStock(name, priceInt);
  };

  return (
    <StyledStockElement>
      <div>{name}</div>
      <div>{price}$</div>

      <div>
        <Button onClick={handleBuy}>Buy</Button>
        <Button onClick={handleSell}>Sell</Button>
      </div>
    </StyledStockElement>
  );
};

export default StockElement;
