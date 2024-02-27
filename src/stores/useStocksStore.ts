import create from "zustand";
import { Stock } from "../types/Stocks";

type StockStore = {
  stocks: Stock[];
  setStocks: (stocks: Stock[]) => void;
  decrementStockAmount: (name: string, value: number) => void;
  incrementStockAmount: (name: string, value: number) => void;
};

export const useStocksStore = create<StockStore>((set) => ({
  stocks: [],
  setStocks: (stocks) => {
    set({ stocks: stocks });
  },
  decrementStockAmount: (name) => {
    set((state) => {
      const existingStock = state.stocks.find((stock) => stock.name === name);
      if (existingStock) {
        const updatedAmount = existingStock.amount - 1;
        if (updatedAmount <= 0) {
          return {
            stocks: state.stocks.filter((stock) => stock.name !== name),
          };
        } else {
          const updatedStock = { ...existingStock, amount: updatedAmount };
          return {
            stocks: state.stocks.map((stock) =>
              stock.name === name ? updatedStock : stock
            ),
          };
        }
      }
      return state;
    });
  },
  incrementStockAmount: (name, value) => {
    set((state) => {
      const existingStock = state.stocks.find((stock) => stock.name === name);
      if (existingStock) {
        const updatedStock = {
          ...existingStock,
          amount: existingStock.amount + 1,
        };
        return {
          stocks: state.stocks.map((stock) =>
            stock.name === name ? updatedStock : stock
          ),
        };
      } else {
        return { stocks: [...state.stocks, { name, amount: 1, value: value }] };
      }
    });
  },
}));
