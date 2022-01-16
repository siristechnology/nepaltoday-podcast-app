import React, { Component, Fragment } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Creators as PlayerCreators } from '~/store/ducks/player'
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager'
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist'

import CONSTANTS from '~/utils/CONSTANTS'

type Props = {
	loadPodcastsRecentlyPlayed: Function,
	setPodcastsDownloadedList: Function,
	loadPlaylists: Function,
	navigation: Object,
}

class StaterScreen extends Component<Props, {}> {
	componentDidMount() {
		const { loadPodcastsRecentlyPlayed, setPodcastsDownloadedList, loadPlaylists, navigation } = this.props

		setPodcastsDownloadedList()

		loadPodcastsRecentlyPlayed()

		loadPlaylists()

		SplashScreen.hide()

		navigation.navigate(CONSTANTS.ROUTES.MAIN_STACK)
	}

	render() {
		return <Fragment />
	}
}

const Creators = Object.assign({}, LocalPodcastsManagerCreators, PlaylistsCreators, PlayerCreators)

const mapDispatchToProps = (dispatch) => bindActionCreators(Creators, dispatch)

export default connect(null, mapDispatchToProps)(StaterScreen)
