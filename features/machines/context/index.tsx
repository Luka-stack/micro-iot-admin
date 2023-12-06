'use client';
import { Filters, Machine } from '@/types';
import { createContext, useContext, useReducer } from 'react';

type MachinePreview = {
  machine: Machine | null;
  visible: boolean;
};

interface State {
  machinePreview: MachinePreview;
  pageNumber: number;
  pageLimit: number;
  currentFilters: string;
  filters: Filters;
}

interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  machinePreview: { machine: null, visible: false },
  pageNumber: 0,
  pageLimit: 10,
  currentFilters: '',
  filters: {
    producents: [],
    types: [],
    models: [],
  },
});

const DispatchContext = createContext<any>(null);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'SET_PAGINATION':
      return {
        ...state,
        pageNumber: payload.pageNumber,
      };

    case 'UPDATE':
      const { status, lastStatusUpdate, productionRate } = payload;

      return {
        ...state,
        machinePreview: {
          visible: true,
          machine: {
            ...state.machinePreview.machine,
            status,
            lastStatusUpdate,
            productionRate,
          },
        },
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

    case 'SET_FILTERS':
      return {
        ...state,
        currentFilters: payload,
      };

    default:
      throw new Error(`Unkown action type: ${type}`);
  }
};

export const MachinesProvider = ({
  children,
  filters,
}: {
  children: React.ReactNode;
  filters: Filters;
}) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    machinePreview: { machine: null, visible: false },
    pageNumber: 1,
    pageLimit: 10,
    currentFilters: '',
    filters,
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
