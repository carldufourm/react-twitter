import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';

// COMPONENTS
import Tweet from './tweet';

class Tweets extends React.Component {
  constructor() {
    super()
  }

  _getTweets() {
    let tweetMap = this.props.tweetList;
    return tweetMap.map( (tweet) => {
      return (
        <Tweet
          key={tweet.id}
          id={tweet.id_str}
          text={tweet.text}
          date={tweet.created_at}
          screen_name={tweet.screen_name}
          user={tweet.user}
          retweet_count={tweet.retweet_count}
          entities={tweet.entities}
        />
      )
    })
  }

  render() {
    let tweets = this._getTweets();

    if (this.props.hasErrored) {
        return <div className="alert alert-danger" role="alert"><strong>Désolé!</strong> Une erreur est survenue en chargeant les tweets</div>
    }

    if (this.props.isLoading) {
        return <div><div className="alert alert-warning" role="alert"><strong>Chargement...</strong></div><div className="loader-container"><div className="loader">Loading...</div></div></div>;
    }

    if (!this.props.tweetList.length) {
        return <div className="alert alert-warning" role="alert"><strong>Désolé!</strong> il n&apos;y a aucun tweets à afficher</div>;
    }

    return (
      <div className="tweets-list list-group">
        <h2>Tweets #{this.props.tweetKeyword}</h2>
        {tweets}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
    return {
        tweetList: state.tweetList,
        tweetKeyword: state.tweetKeywordUpdated,
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

export default connect(mapStateToProps)(Tweets);
