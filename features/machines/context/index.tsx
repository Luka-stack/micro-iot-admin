'use client';
import { Machine, Pagination } from '@/types';
import { createContext, useContext, useReducer } from 'react';

type MachinePreview = {
  machine: Machine | null;
  visible: boolean;
};

interface State {
  machines: Machine[];
  pagination: Pagination;
  machinePreview: MachinePreview;
}

interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  machines: [],
  pagination: { count: 0, limit: 0, offset: 0, total: 0 },
  machinePreview: { machine: null, visible: false },
});

const DispatchContext = createContext<any>(null);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'UPDATE_MACHINE':
      const index = state.machines.findIndex(
        (machine) => machine.serialNumber === payload.serialNumber
      );
      const newMachines = [
        ...state.machines.slice(0, index),
        payload,
        ...state.machines.slice(index + 1),
      ];

      let machinePreview = state.machinePreview;
      if (state.machinePreview.visible) {
        machinePreview = { machine: payload, visible: true };
      }

      return {
        ...state,
        machines: newMachines,
        machinePreview,
      };

    case 'SET_MACHINES':
      const { data, meta } = payload;

      return {
        ...state,
        machines: data,
        pagination: meta,
      };

    case 'SET_PREVIEW':
      if (
        !state.machinePreview.visible ||
        state.machinePreview.machine !== payload
      ) {
        return {
          ...state,
          machinePreview: { machine: payload, visible: true },
        };
      }

      return {
        ...state,
        machinePreview: { ...state.machinePreview, visible: false },
      };

    default:
      throw new Error(`Unkown action type: ${type}`);
  }
};

export const MachinesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    machines: [],
    pagination: { count: 0, limit: 0, offset: 0, total: 0 },
    machinePreview: { machine: null, visible: false },
  });

  const dispatch = (type: Action['type'], payload: Action['payload']) =>
    defaultDispatch({ type, payload });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useMachinesStore = () => useContext(StateContext);
export const useMachinesActions = () => useContext(DispatchContext);
