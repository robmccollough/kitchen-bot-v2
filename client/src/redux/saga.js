import { put, call, takeEvery , takeLatest} from 'redux-saga/effects';
import MenuService from '../service/menu'
import {
    MENU_UPLOAD_FORM_SUBMIT,
    REQUEST_RECENT_MENU,
    MENU_UPLOAD_COMPLETE,
    MENU_UPLOAD_IS_LOADING,
    MENU_UPLOAD_NOT_LOADING,
    RECENT_MENU_FETCHED,
    RECENT_MENU_IS_LOADING,
    RECENT_MENU_NOT_LOADING,
} from './constants'

function* menuUploadSaga(action){
    yield put({
        type: MENU_UPLOAD_IS_LOADING
    })
    yield call(MenuService.uploadMenu, action.payload)
    yield put({
        type: MENU_UPLOAD_NOT_LOADING    
    })
    yield put({
        type: MENU_UPLOAD_COMPLETE
    })
}   


function* menuFetchSaga(){
    yield put({
        type: RECENT_MENU_IS_LOADING
    })
    const menu_data = yield call(MenuService.getMenu)
    yield put({
        type: RECENT_MENU_NOT_LOADING
    })
    yield put({
        type: RECENT_MENU_FETCHED,
        payload: menu_data
    })
}



export default function* menuSaga(){
    yield takeLatest(MENU_UPLOAD_FORM_SUBMIT, menuUploadSaga)
    yield takeLatest(REQUEST_RECENT_MENU, menuFetchSaga)
}