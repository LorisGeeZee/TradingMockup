import { RouterProvider } from "react-router-dom";
import { routes } from "./utils/routes";
import { createContext } from "react";
import { Stock } from "./types/Stocks";

interface AppContextType {
  money: number;
  setMoney: (money: number) => void;
  stocks: Stock[];
  setStocks: (stocks: Stock[]) => void;
}

export const AppContext = createContext<AppContextType>({
  money: 100000,
  setMoney: (_money: number) => _money,
  stocks: [],
  setStocks: (_stocks: Stock[]) => _stocks,
});

function App() {
  return (
    <RouterProvider router={routes} future={{ v7_startTransition: true }} />
  );
}

export default App;
