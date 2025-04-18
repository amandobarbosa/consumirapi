import { call, put, all, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as types from "../types";
import { toast } from "react-toastify";

const requisicao = () => {
  new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 2000);
  });
};

function* exampleRequest() {
  try {
    yield call(requisicao);
    yield put(actions.clicaBotaoSuccess());
  } catch (error) {
    toast.error("Deu erro")
    yield put(actions.clicaBotaoFail());
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
