"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Transaction } from "../_types/types";
import { useAccount, useNetwork } from "wagmi";

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
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [transactions, setTransactions] = useState<Transaction[]>(initialState);

  const updateTransactionsFromLocalStorage = () => {
    const savedState = localStorage.getItem(
      `transactions_${address}_${chain?.id}`
    );
    if (savedState) {
      setTransactions([...JSON.parse(savedState)]);
    } else {
      localStorage.setItem(
        `transactions_${address}_${chain?.id}`,
        JSON.stringify([])
      );
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
  }, [address, chain]);

  //update txns in local storage
  useEffect(() => {
    if (transactions.length === 0) return;

    localStorage.setItem(
      `transactions_${address}_${chain?.id}`,
      JSON.stringify(transactions)
    );
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
