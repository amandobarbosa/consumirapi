import * as types from "../types";
import axios from "../../../services/axios";

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoadind: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoadind = false;

      return newState;
    }
    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }
    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoadind = true;
      return newState;
    }
    case types.REGISTER_UPDATED_SUCCESS: {
      const newState = { ...state };
      newState.user.isLoadind = false;
      newState.user.nome = action.payload.nome;
      newState.user.email = action.payload.email;
      return newState;
    }
    case types.REGISTER_CREATED_SUCCESS: {
      const newState = { ...state };
      newState.isLoadind = false;
      return newState;
    }
    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoadind = false;
      return newState;
    }
    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoadind = true;
      return newState;
    }
    default: {
      return state;
    }
  }
}
