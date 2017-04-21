export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function tweetList(state = [], action) {
    switch (action.type) {
        case 'TWEETS_ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}

export function tweetKeywordUpdated(state = "", action) {
  switch (action.type) {
    case 'TWEET_KEYWORD_UPDATED':
        return action.tweetKeyword;
  default:
      return state;
  }
}
