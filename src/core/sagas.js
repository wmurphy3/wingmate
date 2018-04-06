import { all }                   from 'redux-saga/effects'
import { userSagas }             from './user'

export default function* sagas() {
  yield all([
    ...userSagas,
  ]);
}
