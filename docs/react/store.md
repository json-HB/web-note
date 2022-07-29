---
id: react-store
title: react-store
sidebar_position: 1
---

```jsx title="store.js"
import React, {
  Reducer, useCallback, useContext, useReducer,
} from 'react';

export interface IModel<S> {
  namespace: string;
  state: LoadingState<S>;
  effects: IStringMap<(action: IAction, put: (action: IAction) => void) => void>;
  reducers: IStringMap<Reducer<LoadingState<S>, IAction>>;
}

export interface ILoading {
  loading?: IStringMap<boolean>
}

type LoadingState<S> = S & ILoading;

const DispatchMap = new Map<string, IDispatch>();

export function storeFactory<S>({
  effects, reducers, state, namespace,
}: IModel<S>) {
  function useStore(): [LoadingState<S>, IDispatch] {
    const dispatchFn = useCallback(async (action: IAction) => {
      const handler = effects[action.type];
      if (handler) {
        try {
          put({
            type: 'setLoading',
            payload: {
              [action.type]: true,
            },
          });
          await handler(action, put);
        } finally {
          put({
            type: 'setLoading',
            payload: {
              [action.type]: false,
            },
          });
        }
      } else {
        put(action);
      }
    }, []);
    DispatchMap.set(namespace, dispatchFn);
    const dispatch = useCallback((action: IAction) => {
      const { type } = action;
      if (type.includes('/')) {
        const [ns, actionType] = type.split('/');
        const fn = DispatchMap.get(ns);
        if (fn) {
          const newAction = { ...action, type: actionType };
          fn(newAction);
        }
      } else {
        dispatchFn(action);
      }
    }, [dispatchFn]);
    const reducerFn = useCallback((prevState: LoadingState<S>, action: IAction) => {
      const reducer = reducers[action.type];
      if (reducer) {
        return reducer(prevState, action);
      } if (action.type === 'setLoading') {
        const { loading } = prevState;
        const { payload } = action;
        const newObj = { ...(loading || {}), ...payload };
        return { ...prevState, loading: newObj };
      }
      return prevState;
    }, []);
    const [model, put] = useReducer(reducerFn, state);

    return [
      model,
      dispatch,
    ];
  }

  return useStore;
}

type ModelContextType<S> = [
  LoadingState<S> | undefined,
  IDispatch,
];

interface IUseConnect<S> {
  (mapFn?: IConnectMapFn<S>)
  : [S, IDispatch]
}

export function connectFactory<S>()
: [React.Context<ModelContextType<S>>, IUseConnect<LoadingState<S>>] {
  const context = React.createContext<ModelContextType<S>>([undefined, (action: IAction) => new Promise(() => {})]);

  const useConnect: IUseConnect<LoadingState<S>> = (mapFn) => {
    const [model, dispatch] = useContext(context);
    return [mapFn?.(model!) ?? model!, dispatch];
  };

  return [context, useConnect];
}
```