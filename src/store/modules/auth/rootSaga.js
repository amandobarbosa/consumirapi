import { all } from "redux-saga/effects";
import auth from './sagas'


export default function* rootSaga(){
    return yield all([auth])
}