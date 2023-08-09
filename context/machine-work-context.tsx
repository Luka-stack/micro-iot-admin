'use client';

import { Machine } from '@/types';
import { createContext, useContext, useReducer } from 'react';

type AddMachine = {
  type: 'ADD_MACHINE';
  payload: Machine;
};

type RemoveMachine = {
  type: 'REMOVE_MACHINE';
  payload: string;
};

const StateContext = createContext<Machine[]>([]);

const DispatchContext = createContext<
  (action: AddMachine | RemoveMachine) => void
>((action: AddMachine | RemoveMachine) => {});

const reducer = (
  state: Machine[],
  { type, payload }: AddMachine | RemoveMachine
): Machine[] => {
  if (type === 'ADD_MACHINE') {
    const newMachines = state.filter(
      (machine) => machine.serialNumber !== payload.serialNumber
    );

    if (newMachines.length !== state.length) {
      return newMachines;
    }

    if (state.length > 1) {
      newMachines.shift();
    }

    newMachines.push(payload);

    return newMachines;
  }

  if (type === 'REMOVE_MACHINE') {
    return state.filter((machine) => machine.serialNumber !== payload);
  }

  throw new Error(`Unkown action type: ${type}`);
};

function Provider({ children }: { children: React.ReactNode }) {
  const [state, defaultDispatch] = useReducer<typeof reducer>(reducer, []);

  const dispatch = (action: AddMachine | RemoveMachine) =>
    defaultDispatch(action);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export const MachineWorkContext = {
  useState: () => useContext(StateContext),
  useActions: () => useContext(DispatchContext),
} as const;

export function MachineWorkServerContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
