// @flow

import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Creators as DiscoverCreators } from '~/store/ducks/discover'

import SearchPodcastListComponent from './SearchPodcastListComponent'
import CONSTANTS from '~/utils/CONSTANTS'
import appStyles from '~/styles'

type AuthorProps = {
	loadingSearchProgramByName: boolean,
	authors: Array<Object>,
}

type Props = {
	searchPodcasts: Function,
	author: AuthorProps,
	navigation: Object,
}

class SearchPodcastListContainer extends Component<Props, {}> {
	componentDidMount() {
		const { searchPodcasts } = this.props

		const programName = this.getAuthorNameParam()

		searchPodcasts(programName)
	}

	getAuthorNameParam = (): string => {
		const { navigation } = this.props
		const { params } = navigation.state

		const programName = params[CONSTANTS.PARAMS.SEARCH_AUTHOR_BY_NAME]

		return programName
	}

	render() {
		const { navigation, loadingSearchPodcasts, podcasts = [] } = this.props

		const programName = this.getAuthorNameParam()

		return <SearchPodcastListComponent loading={loadingSearchPodcasts} programName={programName} navigation={navigation} podcasts={podcasts} />
	}
}

const mapStateToProps = (state) => ({
	podcasts: state.discover.podcasts,
	loadingSearchPodcasts: state.discover.loadingSearchPodcasts,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(DiscoverCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchPodcastListContainer)
