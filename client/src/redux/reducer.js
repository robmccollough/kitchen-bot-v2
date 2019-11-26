import {
    MENU_UPLOAD_IS_LOADING,
    MENU_UPLOAD_NOT_LOADING,
    MENU_UPLOAD_COMPLETE,
    RECENT_MENU_IS_LOADING, 
    RECENT_MENU_NOT_LOADING, 
    RECENT_MENU_FETCHED,
    MENU_UPLOAD_FORM_CHANGE 
}from './constants';

const initialState = {
        user:{
            id: null,
            is_authenticated: false
        },
        menu_form: {
            is_loading: false,
            is_visible: true,
            upload_success: false,
            data: {
                date: new Date(),
                food: {
                monday:{
                    main:'',
                    side:''
                    },
                tuesday:{
                    main:'',
                    side:''
                    },
                wednesday:{
                    main:'',
                    side:''
                    },
                thursday:{
                    main:'',
                    side:''
                    },
                friday:{
                    main:'',
                    side:''
                    }
                }
            }
        },
        menu_display: {
            is_loading: false,
            is_visible: true,
            data: {
                date: new Date(),
                food: {
                monday:{
                    main:'',
                    side:''
                },
                tuesday:{
                    main:'',
                    side:''
                },
                wednesday:{
                    main:'',
                    side:''
                },
                thursday:{
                    main:'',
                    side:''
                },
                friday:{
                    main:'',
                    side:''
                }
                }
            }
        }
}

export function reducer(state = initialState, action){
    switch(action.type){

        case MENU_UPLOAD_IS_LOADING: return {
            ...state,
            menu_form: { 
                ...state.menu_form,
                is_loading: true
            }
        }
        case MENU_UPLOAD_NOT_LOADING: return {
            ...state,
            menu_form: { 
                ...state.menu_form,
                is_loading: false
            }
        }

        case MENU_UPLOAD_FORM_CHANGE: return {
            ...state,
            menu_form: {
                ...state.menu_form,
                data: {
                    ...state.menu_form.data,
                    food: {
                        ...state.menu_form.data.food,
                        [action.payload.day]: {
                            ...state.menu_form.data.food[action.payload.day],
                            [action.payload.meal]: action.payload.value
                        }
                    }

                }
            }
        }

        //the data upload will happen elsewhere, just reset the values displayed in the form
        case MENU_UPLOAD_COMPLETE: return {
            ...state,
            menu_form: {
                ...initialState.menu_form,
                upload_success: true
            }

        }
        case RECENT_MENU_IS_LOADING: return {
            ...state,
            menu_display: { 
                ...state.menu_display,
                is_loading: true
            }
        }
        case RECENT_MENU_NOT_LOADING: return {
            ...state,
            menu_display: { 
                ...state.menu_display,
                is_loading: false
            }
        }
        case RECENT_MENU_FETCHED: return {
            ...state,
            menu_display: {
                ...state.menu_display,
                data: action.payload
            }
        }
        default:
            return state;
    }
}