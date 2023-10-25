"use client";
import React, { ReactNode, createContext, useContext } from "react";
import useTransactionManager, {
  TransactionsActions,
  TransactionsState,
} from "../_hooks/useTransactionManager";

interface TransactionContextType {
  transactions: TransactionsState;
  actions: TransactionsActions;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

interface TxnProviderProps {
  children: ReactNode;
}

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
  const [transactions, actions] = useTransactionManager();

  return (
    <TransactionContext.Provider value={{ transactions, actions }}>
      {children}
    </TransactionContext.Provider>
  );
};
