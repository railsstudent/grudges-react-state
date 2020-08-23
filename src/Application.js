import React, { useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

// React.memo
// React.useCallback
// React.useMemo

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

const Application = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={state} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
