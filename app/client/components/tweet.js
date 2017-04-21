import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import Moment from 'moment';
Moment.locale('fr');
var twitter = require('twitter-text')

class Tweet extends React.Component {

  constructor() {
    super()
  }

  render() {
    let tweetText = twitter.autoLink(twitter.htmlEscape(this.props.text));
    let date = Moment(this.props.date).format('DD MMM YYYY');
    let entities = this.props.entities;
    let image = "";
    if(entities.media) {
      image = <div className="row mt-4" style={{width: "100%", textAlign: "center"}}>
        <img src={entities.media[0].media_url} className="img-responsive" style={{maxWidth: "100%", margin: "0 auto"}} />
      </div>;
    }
    let userImg = "";

    if(this.props.user.profile_image_url) {
      userImg = <img src={this.props.user.profile_image_url} style={{width: "30px", height: "30px"}} />
    }

    return (
      <div className="tweet list-group-item justify-content-between" style={{width: "100%"}}>
        <div className="row" style={{width: "100%"}}>
          <div className="col-sm-7 col-md-8" dangerouslySetInnerHTML={{__html: tweetText}}></div>
          <div className="col-sm-5 col-md-4 text-right">
            <p className="mb-0"><strong>Tweeté le</strong> <a href={"https://twitter.com/" + "statuses/" + this.props.id}>{date}</a></p>
            <p className="mb-0"><strong>Par</strong> <a href={"https://twitter.com/" + this.props.user.screen_name}>{this.props.user.name}</a> {userImg}</p>
            <p className="mb-0"><strong>Retweets</strong> <span className="badge badge-default badge-pill"> {this.props.retweet_count}</span></p>
          </div>
        </div>

        {image}
      </div>
    )
  }

};

const mapStateToProps = (state) => {
    return {
        tweetList: state.tweetList,
        tweetKeyword: state.tweetKeyword,
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
