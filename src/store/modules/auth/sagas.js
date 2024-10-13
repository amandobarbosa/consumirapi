import { call, put, all, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as types from "../types";
import { toast } from "react-toastify";
import axios from "../../../services/axios";
import history from "../../../services/history";
import { get } from "lodash";

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/tokens", payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success("Você fez login");

    axios.defaults.headers.Authorization = `Beares ${response.data.token}`;
    history.push(payload.prevPath);
  } catch (error) {
    toast.error("Usuario ou senha inválidos");
    yield put(actions.loginFailure);
  }
}

function persistRehydrate({payload}){
    const token = get(payload, 'auth.token', '')
    if(!token){
        return
    }
    axios.defaults.headers.Authorization = `Beares ${token}`;

}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
