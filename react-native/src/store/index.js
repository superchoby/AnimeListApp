// import { createStore } from 'redux';
// import rootReducer from '../reducers/index';

// const store = createStore(
//     rootReducer, 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true})
//     );
// export default store;

import { createStore } from 'redux';
import rootReducer from '../reducers/index';

// function saveToSessionStorage(state) {
//     try {
//       const serializedState = JSON.stringify(state)
//       sessionStorage.setItem('state', serializedState)
//     } catch(e) {
//       console.log(e)
//     }
//   }
  
//   function loadFromSessionStorage() {
//     try {
//       const serializedState = sessionStorage.getItem('state')
//       if (serializedState === null) return undefined
//       return JSON.parse(serializedState)
//     } catch(e) {
//       console.log(e)
//       return undefined
//     }
//   }

  // const persistedState = loadFromSessionStorage()


const store = createStore(
    rootReducer, 
    // persistedState,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true})
    );

// store.subscribe(() => saveToSessionStorage(store.getState()))

export default store;