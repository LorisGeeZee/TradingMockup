import { create } from "zustand";

type MoneyStore = {
  money: number;
  updateMoney: (money: number) => void;
};

export const useMoneyStore = create<MoneyStore>((set) => ({
  money: 100000,
  updateMoney: (money) => {
    set(() => ({ money: money }));
  },
}));
