import React, { useReducer, createContext, useCallback } from 'react';
import initialState from './initialState';
import id from 'uuid/v4';

export const GrudgeContext = createContext();

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';
const UNDO = 'UNDO';
const REDO = 'REDO';

const reducer = (state = defaultState, action) => {
  console.log('state:', state);
  if (action.type === GRUDGE_ADD) {
    const newPresent = [
      {
        id: id(),
        ...action.payload
      },
      ...state.present
    ];

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: state.future
    };
  }

  if (action.type === GRUDGE_FORGIVE) {
    const newPresent = state.present.map(grudge => {
      if (grudge.id === action.payload.id) {
        return { ...grudge, forgiven: !grudge.forgiven };
      }
      return grudge;
    });

    const state2 =  {
      past: [state.present, ...state.past],
      present: newPresent,
      future: state.future
    };
    console.log('state2:', state2);
    return state2
  }

  if (action.type === UNDO) {
    const [newPresent, ...newPast] = state.past;
    const state2 = {
      past: newPast,
      present: newPresent,
      future: [state.present, ...state.future]
    };
    console.log('state2:', state2);
    return state2
  }

  if (action.type === REDO) {
    const [newPresent, ...newFuture] = state.future;
    const state2 =  {
      past: [state.present, ...state.past],
      present: newPresent,
      future: newFuture
    }
    console.log('state2:', state2);
    return state2;
  }

  return state;
};

const defaultState = {
  past: [],
  present: initialState,
  future: []
};

export const GrudgeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const grudges = state.present;
  const isPast = !!state.past.length;
  const isFuture = !!state.future.length;

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          person,
          reason
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    id => {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: {
          id
        }
      });
    },
    [dispatch]
  );

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, [dispatch]);

  return (
    <GrudgeContext.Provider
      value={{ grudges, addGrudge, toggleForgiveness, undo, isPast, isFuture, redo }}
    >
      {children}
    </GrudgeContext.Provider>
  );
};
