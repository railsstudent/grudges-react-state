import React, { useReducer, createContext, useCallback } from 'react';
import initialState from './initialState';
import id from 'uuid/v4';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

export const GrudgeContext = createContext();

const reducer = (state, action) => {
    if (action.type === GRUDGE_ADD) {
      return [
        action.payload,
        ...state
      ]
    } else if (action.type === GRUDGE_FORGIVE) {
      const { id } = action.payload;
      return state.map(item => 
        item.id !== id ? item: { ...item, forgiven: !item.forgiven }
      );
    }
  }

const GrudgeProvider = ({ children }) => {
    const [grudges, dispatch] = useReducer(reducer, initialState);

    const addGrudge = useCallback(grudge => {
        dispatch(
        { 
            type: GRUDGE_ADD,
            payload: {
                ...grudge,
                id: id(),
                forgiven: false
            }
        });
    }, [dispatch]);

    const toggleForgiveness = useCallback(id => {
        dispatch({
            type: GRUDGE_FORGIVE,
            payload: {
                id
            }
        });
    }, [dispatch]);

    const value = { grudges, addGrudge, toggleForgiveness };

    return (
        <GrudgeContext.Provider value={value}>
            { children }
        </GrudgeContext.Provider>
    );
}

export default GrudgeProvider;