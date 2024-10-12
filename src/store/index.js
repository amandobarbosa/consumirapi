// import {persistStore} from "redux-persist";
// import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import rootReducer from "./modules/example/rootReducer";
// import rootSaga from "./modules/example/rootSaga";
// import persistedReducers from "./modules/reduxPersist";

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   persistedReducers(rootReducer, applyMiddleware(sagaMiddleware))
// );

// sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);
// export default store;


import { persistStore } from "redux-persist";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./modules/example/reducer"
import rootSaga from "./modules/example/rootSaga";
import persistedReducers from "./modules/reduxPersist";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
