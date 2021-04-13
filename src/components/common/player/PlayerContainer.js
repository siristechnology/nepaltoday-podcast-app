import React, { Component, Fragment } from 'react'
import { Animated } from 'react-native'
import SideMenu from 'react-native-side-menu'
import styled from 'styled-components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Creators as PlayerCreators } from '~/store/ducks/player'

import PlaylistList from '~/components/common/playlists-list/PlaylistsListContainer'
import NextPodcastsList from './components/next-podcasts-list/NextPodcastsList'
import PlayerComponent from './components/PlayerComponent'

import CONSTANTS from '~/utils/CONSTANTS'
import appStyles from '~/styles'

const DarkLayer = styled(Animated.View)`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')};
	height: 100%;
	position: absolute;
	background-color: ${({ theme }) => theme.colors.darkLayer};
`

type Props = {
	isCurrentPodcastDownloaded: boolean,
	onToggleAddPlaylistModal: Function,
	isAddPlaylistModalOpen: boolean,
	isAddPlaylistModalOpen: boolean,
	removeFromPlaylist: Function,
	seekProgressTimer: Function,
	disableRepetition: Function,
	playlist: Array<Object>,
	currentPodcast: Object,
	playPrevious: Function,
	playlistIndex: number,
	setupPlayer: Function,
	navigation: Object,
	playNext: Function,
	pause: Function,
	paused: boolean,
	play: Function,
}

type State = {
	isAddPlaylistModalOpen: boolean,
	isQueueSideMenuOpen: boolean,
}

class Player extends Component<Props, State> {
	_darkLayerOpacity = new Animated.Value(0)

	state = {
		isAddPlaylistModalOpen: false,
		isQueueSideMenuOpen: false,
	}

	componentDidMount() {
		const { navigation, playlist, playlistIndex } = this.props
		const { params } = navigation.state

		const playerParams = params[CONSTANTS.PARAMS.PLAYER]
		const isLookingUpPlayer = playerParams[CONSTANTS.KEYS.LOOKUP_PLAYER]

		this.setHeaderRightMenuPress()

		if (isLookingUpPlayer) {
			this.setHeaderTitle(playlist[playlistIndex].category)

			return
		}

		this.handlePlayerConfiguration(playerParams)
	}

	componentWillUpdate(nextProps: Props) {
		const nextPodcast = nextProps.currentPodcast
		const pastPodcast = this.props.currentPodcast

		if (pastPodcast && nextPodcast && pastPodcast._id !== nextPodcast._id) {
			this.setHeaderTitle(nextPodcast.category)
		}
	}

	onToggleAddPlaylistModal = (): void => {
		const { isAddPlaylistModalOpen } = this.state

		this.setState({
			isAddPlaylistModalOpen: !isAddPlaylistModalOpen,
		})
	}

	onToggleQueueSideMenu = (): void => {
		const { isQueueSideMenuOpen } = this.state
		const { navigation } = this.props

		navigation.setParams({
			[CONSTANTS.KEYS.IS_PLAYER_RIGHT_MENU_OPEN]: !isQueueSideMenuOpen,
		})

		this.setDarkLayerOpacity()

		this.setState({
			isQueueSideMenuOpen: !isQueueSideMenuOpen,
		})
	}

	setHeaderTitle = (subject: string): void => {
		const { navigation } = this.props

		navigation.setParams({
			[CONSTANTS.PARAMS.PLAYER_TITLE]: subject,
		})
	}

	setDarkLayerOpacity = (): void => {
		Animated.timing(this._darkLayerOpacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start()
	}

	setHeaderRightMenuPress = (): void => {
		const { navigation } = this.props

		navigation.setParams({
			[CONSTANTS.PARAMS.HEADER_BUTTON_RIGHT_PLAYER_ACTION]: this.onToggleQueueSideMenu,
		})
	}

	handlePlayerConfiguration = (playerParams: Object): void => {
		const { playlist: pastPlaylist, currentPodcast, playlistIndex, paused } = this.props

		const playlist = playerParams[CONSTANTS.KEYS.PLAYLIST]

		const isCurrentPodcastDefined = !!currentPodcast
		const isPodcastChanged = isCurrentPodcastDefined && currentPodcast._id !== playlist[0]._id
		const isPlayingSamePlaylist = this.checkIsPlayingSamePlaylist(playlist, pastPlaylist)

		if (!isCurrentPodcastDefined || isPodcastChanged || !isPlayingSamePlaylist) {
			const { setPodcast } = this.props
			setPodcast(playlist)
		}

		this.setHeaderTitle(playlist[0].category)
	}

	checkIsPlayingSamePlaylist = (currentPlaylist: Array<Object>, pastPlaylist: Array<Object>): boolean => {
		if (!pastPlaylist || currentPlaylist.length !== pastPlaylist.length) {
			return false
		}

		for (let i = 0; i < currentPlaylist.length; i++) {
			if (currentPlaylist[i]._id !== pastPlaylist[i]._id) {
				return false
			}
		}

		return true
	}

	playClick = (play) => {
		play()
	}

	pauseClick = (pause) => {
		pause()
	}

	playPreviousClick = (playPrevious) => {
		playPrevious()
	}

	playNextClick = (playNext) => {
		playNext()
	}

	render() {
		const {
			isCurrentPodcastDownloaded,
			removeFromPlaylist,
			seekProgressTimer,
			currentPodcast,
			playlistIndex,
			playPrevious,
			playlist,
			playNext,
			paused,
			pause,
			play,
			jumpForward,
			jumpBackward,
		} = this.props

		const { isAddPlaylistModalOpen, isQueueSideMenuOpen } = this.state

		return (
			<Fragment>
				{!!currentPodcast && (
					<SideMenu
						animationFunction={(prop, value) =>
							Animated.timing(prop, {
								toValue: value,
								duration: 250,
								useNativeDriver: true,
							})
						}
						menu={
							isQueueSideMenuOpen ? (
								<NextPodcastsList
									onBackPress={this.onToggleQueueSideMenu}
									removeFromPlaylist={removeFromPlaylist}
									playlistIndex={playlistIndex}
									playlist={playlist}
								/>
							) : null
						}
						openMenuOffset={appStyles.metrics.getWidthFromDP('85%')}
						isOpen={isQueueSideMenuOpen}
						bounceBackOnOverdraw
						menuPosition="right"
						disableGestures
					>
						<PlayerComponent
							onToggleAddPlaylistModal={this.onToggleAddPlaylistModal}
							isCurrentPodcastDownloaded={isCurrentPodcastDownloaded}
							isAddPlaylistModalOpen={isAddPlaylistModalOpen}
							seekProgressTimer={seekProgressTimer}
							currentPodcast={currentPodcast}
							playlistIndex={playlistIndex}
							playPrevious={playPrevious}
							playNext={playNext}
							jumpForward={jumpForward}
							jumpBackward={jumpBackward}
							playlist={playlist}
							paused={paused}
							pause={pause}
							play={play}
						/>
					</SideMenu>
				)}
				{isQueueSideMenuOpen && (
					<DarkLayer
						style={{
							opacity: this._darkLayerOpacity,
						}}
					/>
				)}
				{isAddPlaylistModalOpen && <PlaylistList onToggleModal={this.onToggleAddPlaylistModal} podcast={currentPodcast} />}
			</Fragment>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(PlayerCreators, dispatch)

const mapStateToProps = (state) => ({
	isCurrentPodcastDownloaded: state.player.isCurrentPodcastDownloaded,
	currentPodcast: state.player.currentPodcast,
	playlistIndex: state.player.playlistIndex,
	playlist: state.player.playlist,
	paused: state.player.paused,
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
