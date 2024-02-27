import { Link } from "react-router-dom";
import styled from "styled-components";
import StockElement from "../components/StockElement";

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

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 3rem;
  border-radius: 5rem;
  background-color: black;
`;

const TradingPage = () => {
  const companies: string[] = [
    "Apple",
    "Microsoft",
    "Amazon",
    "Google",
    "Facebook",
    "Tesla",
    "Netflix",
    "Samsung",
    "Toyota",
    "Nike",
  ];

  return (
    <StyledContainer>
      <div>TradingPage</div>
      {companies.map((company, index) => (
        <StockElement key={index} name={company} />
      ))}
      <StyledButton to={"/dashboard"}>Back</StyledButton>
    </StyledContainer>
  );
};

export default TradingPage;
