import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';


export default function (state = {}, action) {
    switch(action.type) {
    case FETCH_POST:
        // const post = action.payload.data
        // const newState = { ...state}
        // newState[post.id] = post
        // return newState;
        return { ...state, [action.payload.data.id]: action.payload.data}
    case FETCH_POSTS:
        // es6 way
        // let stateObj = {}
        // action.payload.data.map(object => {
        //     stateObj[object.id] = object
        // })
        // return stateObj
        return _.mapKeys(action.payload.data, 'id')
    case DELETE_POST:
        // returns new object that omits the current id object
        return _.omit(state, action.payload)
    default:
        return state;
    }
}
