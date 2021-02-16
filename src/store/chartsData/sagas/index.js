import { all } from "redux-saga/effects";
import userSagas from "./sagas";

export default function* rootSaga() {
  yield all([...userSagas]);
}
