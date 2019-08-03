import { PREPARE_TO_DELETE, STORE_TOKEN, STORE_USERNAME } from '../actiontypes/actionTypes';

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
