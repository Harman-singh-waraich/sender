import { useState, useEffect } from "react";
import { Transaction } from "../_types/types";

export type TransactionsState = Transaction[];

export interface TransactionsActions {
  addTxn: (txn: Transaction) => void;
  updateTxnValue: (hash: Transaction["hash"], newData: any) => void;
}

const useTransactionManager = (): [TransactionsState, TransactionsActions] => {
  const initialState: TransactionsState = [];

  const [transactions, setTransactions] =
    useState<TransactionsState>(initialState);

  //check for saved txns in local storage
  useEffect(() => {
    const savedState = localStorage.getItem("transactions");
    if (savedState) setTransactions([...JSON.parse(savedState)]);
  }, []);

  //update txns in local storage
  useEffect(() => {
    if (transactions.length === 0) return;
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  //actions

  const addTxn = (txn: Transaction) => {
    setTransactions([...transactions, txn]);
  };

  const updateTxnValue = (hash: Transaction["hash"], newData: any) => {
    const updatedTransactions = transactions.map((txn) =>
      txn.hash === hash ? { ...txn, ...newData } : txn
    );
    setTransactions(updatedTransactions);
  };

  return [
    transactions,
    {
      addTxn,
      updateTxnValue,
    },
  ];
};

export default useTransactionManager;
