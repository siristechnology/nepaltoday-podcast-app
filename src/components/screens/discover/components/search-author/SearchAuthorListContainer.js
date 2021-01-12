// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';

import SearchAuthorListComponent from './SearchAuthorListComponent';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

type AuthorProps = {
  loadingSearchProgramByName: boolean,
  authors: Array<Object>,
};

type Props = {
  searchProgramByName: Function,
  author: AuthorProps,
  navigation: Object,
};

class SearchAuthorListContainer extends Component<Props, {}> {
  componentDidMount() {
    const { searchProgramByName } = this.props;

    const programName = this.getAuthorNameParam();

    searchProgramByName(programName);
  }

  getAuthorNameParam = (): string => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    const programName = params[CONSTANTS.PARAMS.SEARCH_AUTHOR_BY_NAME];

    return programName;
  };

  render() {
    const { navigation, author } = this.props;
    const { loadingSearchProgramByName, programs } = author;
    const programName = this.getAuthorNameParam();

    return (
      <SearchAuthorListComponent
        loading={loadingSearchProgramByName}
        programName={programName}
        navigation={navigation}
        programs={programs}
      />
    );
  }
}

const mapStateToProps = state => ({
  author: state.author,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthorCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchAuthorListContainer);
