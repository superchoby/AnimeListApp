import { PREPARE_TO_DELETE, STORE_TOKEN, STORE_USERNAME, STORE_ORDER_CHANGED_OR_REVERSED, PREPARE_TO_EDIT } from '../actiontypes/actionTypes';

export function prepareToDelete(shouldPrepareToDelete){
    return {
        type: PREPARE_TO_DELETE,
        payload: shouldPrepareToDelete,
    }
}

export function storeToken(token){
    return{
        type: STORE_TOKEN,
        payload: token,
    }
}

export function storeUsername(username){
    return{
        type: STORE_USERNAME,
        payload: username,
    }
}

export function storeOrderChangedOrReversed(orderChangedOrReversed){
    return{
        type: STORE_ORDER_CHANGED_OR_REVERSED,
        payload: orderChangedOrReversed,
    }
}

export function prepareToEdit(shouldPrepareToEdit){
    return {
        type: PREPARE_TO_EDIT,
        payload: shouldPrepareToEdit,
    }
}