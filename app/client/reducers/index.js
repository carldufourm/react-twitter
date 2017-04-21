import { combineReducers } from 'redux';
import { tweetList, tweetKeywordUpdated, itemsHasErrored, itemsIsLoading } from './items';

export default combineReducers({
    tweetList,
    tweetKeywordUpdated,
    itemsHasErrored,
    itemsIsLoading
});
