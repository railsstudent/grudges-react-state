import React, { createContext, useCallback } from 'react';
import initialState from './initialState';
import id from 'uuid/v4';
import useUndoReducer, {GRUDGE_ADD, GRUDGE_FORGIVE, UNDO, REDO } from './GrudgeUndoReducer';

export const GrudgeContext = createContext();

const reducer = (state, action) => {
  console.log('state:', state);
  if (action.type === GRUDGE_ADD) {
      const newPresent = [
      {
          id: id(),
          ...action.payload
      },
      ...state.present
      ];
      return newPresent;
  }

  if (action.type === GRUDGE_FORGIVE) {
      const newPresent = state.present.map(grudge => {
      if (grudge.id === action.payload.id) {
          return { ...grudge, forgiven: !grudge.forgiven };
      }
      return grudge;
      });
      return newPresent;
  }

  return state;
};

export const GrudgeProvider = ({ children }) => {
  const [state, dispatch] = useUndoReducer(reducer, initialState); // useUndoReducer(reducer, initialState);
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
