'use client';

import { createContext, useContext, useState } from 'react';

import { Machine } from '@/types';

const useMachines = () => useState<Machine[]>([]);

const ProductionContext = createContext<ReturnType<typeof useMachines> | null>(
  null
);

export const useProductionContext = () => {
  const context = useContext(ProductionContext);

  if (!context) {
    throw new Error(
      'useProductionContext must be used within an MachinesProductionContext'
    );
  }

  return context;
};

export function ProductionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const machines = useMachines();

  return (
    <ProductionContext.Provider value={machines}>
      {children}
    </ProductionContext.Provider>
  );
}
