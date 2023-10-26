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

  const updateTransactionsFromLocalStorage = () => {
    const savedState = localStorage.getItem("transactions");
    if (savedState) {
      setTransactions([...JSON.parse(savedState)]);
    }
  };

  useEffect(() => {
    // Check for saved txns on initial mount  in local storage
    updateTransactionsFromLocalStorage();

    // Listen for changes in local storge
    window.addEventListener("storage", updateTransactionsFromLocalStorage);

    return () => {
      window.removeEventListener("storage", updateTransactionsFromLocalStorage);
    };
  }, []);

  //update txns in local storage
  useEffect(() => {
    if (transactions.length === 0) return;

    localStorage.setItem("transactions", JSON.stringify(transactions));

    window.scrollBy({ top: 200, behavior: "smooth" });
  }, [transactions]);

  //actions
  const addTxn = (txn: Transaction) => {
    setTransactions((prevState) => [txn, ...prevState]);
  };

  const updateTxnValue = (hash: Transaction["hash"], newData: any) => {
    setTransactions((prevState) => {
      const updatedTransactions = prevState.map((txn) =>
        txn.hash === hash ? { ...txn, ...newData } : txn
      );
      return [...updatedTransactions];
    });
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTxn, updateTxnValue }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
