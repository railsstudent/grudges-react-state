import React, { useReducer } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducers = (state, action) => {
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
  const [state, dispatch] = useReducer(reducers, initialState);

  const addGrudge = grudge => {
    dispatch(
    { 
      type: GRUDGE_ADD,
      payload: {
        ...grudge,
        id: id(),
        forgiven: false
      }
    });
  };

  const toggleForgiveness = id => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: {
        id
      }
    });
  };

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={state} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
