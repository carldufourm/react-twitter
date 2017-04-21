import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './client/store/configureStore';

// COMPONENTS
import Controls from './client/components/controls';
import Tweets from './client/components/tweets';
import Footer from './client/components/footer'

const store = configureStore({
  tweetList: [],
  tweetKeywordUpdated: "",
  itemsHasErrored: false,
  itemsIsLoading: false
});

ReactDOM.render(
  <Provider store={store}>
    <div>
      <div className="container">
        <Controls />
        <Tweets />
      </div>
      <Footer />
    </div>
  </Provider>,
  document.getElementById('app')
);
