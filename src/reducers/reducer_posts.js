import _ from 'lodash';
import { FETCH_POSTS } from '../actions';


export default function (state = {}, action) {
    switch(action.type) {
    case FETCH_POSTS:
        // es6 way
        // let stateObj = {}
        // action.payload.data.map(object => {
        //     stateObj[object.id] = object
        // })
        // return stateObj
        return _.mapKeys(action.payload.data, 'id')
    default:
        return state;
    }
}
