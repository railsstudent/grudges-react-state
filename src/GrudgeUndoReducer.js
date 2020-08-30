import { useReducer } from 'react';

export const GRUDGE_ADD = 'GRUDGE_ADD';
export const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';
export const UNDO = 'UNDO';
export const REDO = 'REDO';

const useUndoReducer = (reducer, initialState) => {
    const undoState = {
      past: [],
      present: initialState,
      future: []
    };
  
    const undoReducer = (state, action) => {
      // UNDO and REDO needs to update present, past and future properties
      if (action.type === UNDO) {
        const [newPresent, ...newPast] = state.past;
        return {
          past: newPast,
          present: newPresent,
          future: [state.present, ...state.future]
        };
      }
    
      if (action.type === REDO) {
        const [newPresent, ...newFuture] = state.future;
        return  {
          past: [state.present, ...state.past],
          present: newPresent,
          future: newFuture
        }
      }
  
      const newPresent = reducer(state, action);
      // Handle GRUDGE_ADD and GRUNGE_FORGIVE actions
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: state.future
      };
    }
  
    // state and action are passed to undoReducer to derive new state
    // initial state is undoState
    return useReducer(undoReducer, undoState);
}

export default useUndoReducer;
