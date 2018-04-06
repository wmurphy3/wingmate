import thunk                                      from 'redux-thunk'
import createSagaMiddleware                       from 'redux-saga';
import { createStore, applyMiddleware, compose }  from 'redux'
import { unsetUser }                              from './user'
import reducers                                   from './reducers'
import sagas                                      from './sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(sagaMiddleware, thunk)

  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }

  const store = createStore(reducers, middleware)
  sagaMiddleware.run(sagas);

  store.subscribe(() => {
    const state = store.getState().lastAction;
    // if (state.data === 401) {
    //   store.dispatch(unsetUser())
    // }
  })

  return store
}
