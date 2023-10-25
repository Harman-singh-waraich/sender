"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Transaction } from "../_types/types";

interface TransactionContextType {
  transactions: Transaction[];
  addTxn: (txn: Transaction) => void;
  updateTxnValue: (hash: Transaction["hash"], newData: any) => void;
}

interface TxnProviderProps {
  children: ReactNode;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

//hook to use the context in app
export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export const TransactionProvider: React.FC<TxnProviderProps> = ({
  children,
}) => {
  const initialState: Transaction[] = [];

  const [transactions, setTransactions] = useState<Transaction[]>(initialState);

  //check for saved txns in local storage
  useEffect(() => {
    const savedState = localStorage.getItem("transactions");
    if (savedState) setTransactions([...JSON.parse(savedState)]);
  }, []);

  //update txns in local storage
  useEffect(() => {
    if (transactions.length === 0) return;
    console.log(transactions);

    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  //actions

  const addTxn = (txn: Transaction) => {
    const newState = [...transactions, txn];

    setTransactions(newState);
  };

  const updateTxnValue = (hash: Transaction["hash"], newData: any) => {
    const updatedTransactions = transactions.map((txn) =>
      txn.hash === hash ? { ...txn, ...newData } : txn
    );
    setTransactions(updatedTransactions);
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTxn, updateTxnValue }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
