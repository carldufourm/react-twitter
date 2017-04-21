export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsTweetsFetchDataSuccess(items) {
    return {
        type: 'TWEETS_ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsTweetsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsTweetsFetchDataSuccess(items.statuses)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function tweetKeywordUpdated(string) {
    return {
        type: 'TWEET_KEYWORD_UPDATED',
        tweetKeyword: string
    };
}
