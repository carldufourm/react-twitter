import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, tweetKeywordUpdated, itemsTweetsFetchData } from '../actions/items';

let fetchUrl = "http://localhost:3000/gettweets?tweetKeyword=";

class Controls extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: "",
    }
  }

  render() {
    return (
      <div className="__component__controls pt-4 pb-3 pl-4 pr-4 jumbotron jumbotron-fluid">
        <h2>Controles</h2>
        <div className="row">
          <div className="col-md-6 pt-2 pb-2">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => this._buttonClick(event, "trump")}>Tweets #trump</button>
          </div>
          <div className="col-md-6 pt-2 pb-2">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => this._buttonClick(event, "clinton")}>Tweets #clinton</button>
          </div>
        </div>

        <div className="form-group pt-3">
          <label htmlFor="search-input" className="col-form-label col-form-label-lg">Ou recherchez par mot clé</label>

          <form onSubmit={(e) => this._searchSubmit(e)} onChange={(e) => this._updateInputValue(e)}>
            <div className="row">
              <div className="col-md-6">
                <input className="form-control form-control-lg" type="search" placeholder="" id="search-input" ref="inputValue" />
              </div>
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary btn-lg btn-block">Rechercher</button>
              </div>
            </div>
          </form>
        </div>

      </div>
    )
  }

  _updateInputValue(event) {
    this.setState({
      inputValue: this.refs.inputValue.value
    });
  }

  _buttonClick(event, hashtag) {
    event.preventDefault();

    this._updateContent(fetchUrl, hashtag);
  }

  _searchSubmit(event) {
    event.preventDefault();

    this._updateContent(fetchUrl, this.state.inputValue);
  }

  _updateContent(fetchUrl, hashtag) {
    if (hashtag === "") return false;
    
    let sanitizedHashtag = hashtag.replace(/[^a-zA-Z0-9-_]/g, '');
    // Make the request to fetch tweets
    this.props.tweetsFetchData(fetchUrl + sanitizedHashtag + '&count=50');
    // Update hashtag title
    this.props.updateTweetKeyword(sanitizedHashtag);
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
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        tweetsFetchData: (fetchUrl) => dispatch(itemsTweetsFetchData(fetchUrl)),
        updateTweetKeyword: (string) => dispatch(tweetKeywordUpdated(string)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
