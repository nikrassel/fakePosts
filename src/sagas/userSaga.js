import usersService from "../services/users.service"
import { call, fork, put, takeLeading } from "redux-saga/effects"
import { sleep } from "../utils/sleep"

async function usersGet() {
    const request = await usersService.get()
    sleep(500)
    return request
}

export function* workerSaga() {
    yield put({ type: "BEGIN_LOADING" })
    const result = yield call(usersGet)
    yield put({ type: "SET_USERS", payload: result })
    yield put({ type: "END_LOADING" })
}

export function* watchUserSaga() {
    yield takeLeading("LOAD_USERS", workerSaga)
}

export default function* userSaga() {
    yield fork(watchUserSaga)
}
