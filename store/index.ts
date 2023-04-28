import { Machine, MachinesResponse, Pagination } from '@/types';
import { create } from 'zustand';

interface MachineStore {
  machines: Machine[];
  pagination: Pagination;
  initialLoad: boolean;
  setMachines: (data: MachinesResponse) => void;
  addMachine: (data: Machine) => void;
}

export const useMachineStore = create<MachineStore>((set) => ({
  machines: [],
  pagination: { count: 0, limit: 0, offset: 0, total: 0 },
  initialLoad: true,
  setMachines: (data) =>
    set({ machines: data.data, pagination: data.meta, initialLoad: false }),
  addMachine: (data) =>
    set((state) => {
      const index = state.machines.findIndex(
        (machine) => machine.serialNumber === data.serialNumber
      );

      const newMachines = [
        ...state.machines.slice(0, index),
        data,
        ...state.machines.slice(index + 1),
      ];

      return { machines: newMachines };
    }),
}));
