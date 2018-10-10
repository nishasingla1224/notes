import {FETCH_NOTES,DELETE_NOTE,FETCH_NOTE,ADD_NOTE,UPDATE_NOTE} from '../actions';


import _ from 'lodash';

export default function  (state = {},action){
    switch(action.type){
        case FETCH_NOTES:
        return _.mapKeys(action.payload, 'id');
           
        case DELETE_NOTE:
           return _.omit(state,action.payload);
        case FETCH_NOTE:
            return {...state , [action.payload.id]: action.payload};
        case ADD_NOTE:
            debugger;
            return {...state,[action.payload.id]: action.payload};
        case UPDATE_NOTE:
           return {...state ,[action.payload.id]: action.payload};
       default:
           return state;
    }
}