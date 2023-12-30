import { ModelFilter, ProducentFilter, TypeFilter } from '@/types';
import { useCallback, useReducer } from 'react';

type State = {
  producent: ProducentFilter | null;
  type: TypeFilter | null;
  model: ModelFilter | null;
  allTypes: TypeFilter[];
  allModels: ModelFilter[];
  availableTypes: TypeFilter[];
  availableModels: ModelFilter[];
};

type SetProducentAction = {
  type: 'SET_PRODUCENT';
  payload: ProducentFilter | null;
};

type SetTypeAction = {
  type: 'SET_TYPE';
  payload: TypeFilter | null;
};

type SetModelAction = {
  type: 'SET_MODEL';
  payload: ModelFilter | null;
};

function reducer(
  state: State,
  action: SetProducentAction | SetTypeAction | SetModelAction
): State {
  switch (action.type) {
    case 'SET_MODEL':
      return { ...state, model: action.payload };

    case 'SET_PRODUCENT': {
      if (!action.payload) {
        return {
          ...state,
          producent: null,
          type: null,
          model: null,
          availableTypes: state.allTypes,
          availableModels: state.allModels,
        };
      }

      const availableTypes = state.allTypes.filter((type) =>
        type.producents.includes(action.payload!.name)
      );
      const availableModels = state.allModels.filter(
        (model) => model.producent === action.payload!.name
      );

      return {
        ...state,
        producent: action.payload,
        type: null,
        model: null,
        availableModels,
        availableTypes,
      };
    }

    case 'SET_TYPE': {
      if (!action.payload) {
        return {
          ...state,
          type: null,
          model: null,
          allModels: state.allModels,
        };
      }

      const availableModels = state.allModels.filter(
        (model) =>
          model.type === action.payload!.name &&
          (state.producent ? model.producent === state.producent.name : true)
      );

      return { ...state, type: action.payload, model: null, availableModels };
    }

    default:
      throw new Error('Invalid action type');
  }
}

export function useFilterReducer(types: TypeFilter[], models: ModelFilter[]) {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    producent: null,
    type: null,
    model: null,
    allTypes: types,
    allModels: models,
    availableTypes: types,
    availableModels: models,
  });

  const selectProducent = useCallback(
    (payload: ProducentFilter | null) =>
      dispatch({ type: 'SET_PRODUCENT', payload }),
    []
  );

  const selectType = useCallback(
    (payload: TypeFilter | null) => dispatch({ type: 'SET_TYPE', payload }),
    []
  );

  const selectModel = useCallback(
    (payload: ModelFilter | null) => dispatch({ type: 'SET_MODEL', payload }),
    []
  );

  return {
    producent: state.producent,
    type: state.type,
    model: state.model,
    availableTypes: state.availableTypes,
    availableModels: state.availableModels,
    selectProducent,
    selectType,
    selectModel,
  };
}
