import React, { createContext, useReducer } from 'react';
import { beedleData } from '../data/beedleData';

export const BeedleContext = createContext();

const defaultState = {
  quotes: [...beedleData],
  prevMessage: {
    id: null,
    condition: null,
    quote: '',
  },
  message: {
    id: null,
    condition: null,
    quote: '',
  }
};

const setBeedleStorage = state => {
  localStorage.setItem('beedle', JSON.stringify(state));
};

let initialState = !localStorage.getItem('beedle') || {...defaultState};
console.log(initialState);
!localStorage.getItem('beedle') && setBeedleStorage(defaultState);

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const BeedleReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CLEAR':
      const filtered = state.quotes.filter(obj => obj.condition === 'clear') || [];
      const msg = filtered[getRandomInt(filtered.length)] || { id: 0, condition: 'error', str: '' };

      const updatedMsg = {
        ...state,
        message: msg
      };

      setBeedleStorage(updatedMsg);
      return updatedMsg;
    case 'PREV':
      const updatedPrev = {
        ...state,
        prevMessage: payload
      };

      setBeedleStorage(updatedPrev);
      return updatedPrev;
    default: 
      console.error('invalid action: ', type);
  }
};

const BeedleContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(BeedleReducer, initialState);

	const setClearMsg = () => dispatch({ type: 'CLEAR'});

  const setPrevMsg = payload => dispatch({ type: 'PREV', payload });

	const contextValues = {
    setPrevMsg,
    setClearMsg,
		...state,
	};

	return <BeedleContext.Provider value={contextValues}>{children}</BeedleContext.Provider>;
};

export default BeedleContextProvider;
