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

function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "");
  if (!token) {
    return;
  }
  axios.defaults.headers.Authorization = `Beares ${token}`;
}
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;
  try {
    if (id) {
      yield call(axios.put, "/users", {
        email,
        nome,
        password: password || undefined,
      });
      toast.success("conta alterada com sucesso");
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
    }
  } catch (error) {
    if (id) {
      const errors = get(error, "response.data.erros", []);
      const status = get(error, "response.data.status", 0);

      if (errors.length > 0) {
        errors.map((error) => toast.error.apply(error));
      } else {
        toast.error("erro desconhecido");
      }

      if (status === 401) {
        toast.error("Você precisa fazer login novamente");
        yield put(actions.loginFailure());
        return history.push("/login");
      }
      yield call(axios.post, "/users", {
        email,
        nome,
        password,
      });
      toast.success("conta criada");
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push("/login");
    } else {
      toast.error("Erro desconhecido");
    }

    yield put(actions.reg);
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
