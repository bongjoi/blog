import { call, put } from 'redux-saga/effects'
import { startLoading, finishLoading } from '../modules/loading'

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`
  const FAILURE = `${type}_FAILURE`
  return [type, SUCCESS, FAILURE]
}

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`
  const FAILURE = `${type}_FAILURE`

  return function* (action) {
    yield put(startLoading(type)) // 로딩 시작
    try {
      const response = yield call(request, action.payload)
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response // HTTP 헤더 및 상태 코드 조회 가능
      })
    } catch (err) {
      yield put({
        type: FAILURE,
        payload: err,
        error: true
      })
    }
    yield put(finishLoading(type)) // 로딩 끝
  }
}
