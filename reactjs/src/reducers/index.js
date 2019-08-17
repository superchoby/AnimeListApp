import { PREPARE_TO_DELETE, STORE_TOKEN, STORE_USERNAME, STORE_ORDER_CHANGED_OR_REVERSED, PREPARE_TO_EDIT } from '../actiontypes/actionTypes';

const initialState = {
    shouldPrepareToDelete: [],
    token: [],
    username: [],
    orderChangedOrReversed: [],
    shouldPrepareToEdit: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){

        case PREPARE_TO_DELETE:
            return Object.assign({}, state, {
                shouldPrepareToDelete: state.shouldPrepareToDelete.concat(action.payload)
                });

        case STORE_TOKEN:
            return Object.assign({}, state, {
                token: state.token.concat(action.payload)
                });

        case STORE_USERNAME:
            return Object.assign({}, state, {
                username: state.username.concat(action.payload)
                });

        case STORE_ORDER_CHANGED_OR_REVERSED:
            return Object.assign({}, state, {
                orderChangedOrReversed: state.orderChangedOrReversed.concat(action.payload)
                });

        case PREPARE_TO_EDIT:
            return Object.assign({}, state, {
                shouldPrepareToEdit: state.shouldPrepareToEdit.concat(action.payload)
                });

        default:
            return state;
    }
}

export default rootReducer;