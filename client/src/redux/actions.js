import {
    MENU_UPLOAD_FORM_SUBMIT,
    MENU_UPLOAD_IS_LOADING,
    MENU_UPLOAD_NOT_LOADING,
    MENU_UPLOAD_COMPLETE,
    REQUEST_RECENT_MENU,
    RECENT_MENU_IS_LOADING, 
    RECENT_MENU_NOT_LOADING, 
    RECENT_MENU_FETCHED,
    MENU_UPLOAD_FORM_CHANGE
}from './constants';


export function menuUploadFormSubmit(form_data){
    return {
        type: MENU_UPLOAD_FORM_SUBMIT,
        payload: form_data
    }
}

export function menuUploadFormChange(form_elt){
    return {
        type: MENU_UPLOAD_FORM_CHANGE,
        payload: form_elt
    }
}

export function requestRecentMenu(){
    return {
        type: REQUEST_RECENT_MENU
    }
}

