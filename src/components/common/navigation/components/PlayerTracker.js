import React, { Fragment } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Creators as PlayerCreators } from '~/store/ducks/player'

import ProgressTimeLine from './ProgressTimeLine'
import Icon from '~/components/common/Icon'
import CONSTANTS from '~/utils/CONSTANTS'

import TrackPlayer from 'react-native-track-player'

const Wrapper = styled(View)`
	width: 100%;
	height: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
	padding-right: ${({ theme }) => theme.metrics.smallSize}px;
	background-color: ${({ theme }) => theme.colors.backgroundColor};
`

const ContentWrapper = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
`

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
	source: { uri },
}))`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
	height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
	border-radius: 3px;
`

const PlayerButtonsWrapper = styled(View)`
	flex-direction: row;
	align-items: center;
`

const TextContentWrapper = styled(View)`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
	padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
`

const PodcastTitle = styled(Text).attrs({
	numberOfLines: 1,
})`
	font-family: CircularStd-Bold;
	font-size: ${({ theme }) => theme.metrics.largeSize}px;
	color: ${({ theme }) => theme.colors.textColor};
`

const AuthorName = styled(Text).attrs({
	numberOfLines: 1,
})`
	font-family: CircularStd-Medium;
	font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2}px;
	color: ${({ theme }) => theme.colors.subTextColor};
`

const PlayerIcon = styled(Icon).attrs(({ theme, size, name }) => ({
	color: theme.colors.textColor,
	size,
	name,
}))``

type AuthorProps = {
	name: string,
}

type PodcastProps = {
	author: AuthorProps,
	imageUrl: string,
	title: string,
}

type Props = {
	currentPodcast: PodcastProps,
	playlist: Array<Object>,
	navigation: Object,
	playNext: Function,
	paused: boolean,
	pause: Function,
	play: Function,
}

const PlayerTracker = ({ currentPodcast, navigation, paused, pause, play }: Props): Object => {
	if (!currentPodcast) {
		return null
	}

	const playClick = (play) => {
		TrackPlayer.play()
		play()
	}

	const pauseClick = (pause) => {
		TrackPlayer.pause()
		pause()
	}

	const jumpForward = async () => {
		const currentPosition = await TrackPlayer.getPosition()
		TrackPlayer.seekTo(currentPosition + 30)
	}

	return (
		<Fragment>
			<ProgressTimeLine />
			<Wrapper>
				<ContentWrapper
					onPress={() =>
						navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
							[CONSTANTS.PARAMS.PLAYER]: {
								[CONSTANTS.KEYS.LOOKUP_PLAYER]: true,
							},
						})
					}
				>
					<PodcastImage uri={currentPodcast.imageUrl} />
					<TextContentWrapper>
						<PodcastTitle>{currentPodcast.title}</PodcastTitle>
						<AuthorName>{currentPodcast.program.title}</AuthorName>
					</TextContentWrapper>
				</ContentWrapper>
				<PlayerButtonsWrapper>
					<TouchableOpacity
						onPress={() => (paused ? playClick(play) : pauseClick(pause))}
						style={{
							paddingHorizontal: 10,
						}}
					>
						<PlayerIcon name={paused ? 'play-circle' : 'pause-circle'} size={40} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => jumpForward()}
						style={{
							paddingHorizontal: 10,
						}}
					>
						<PlayerIcon name="fast-forward-30" size={32} />
					</TouchableOpacity>
				</PlayerButtonsWrapper>
			</Wrapper>
		</Fragment>
	)
}

const mapStateToProps = (state) => ({
	currentPodcast: state.player.currentPodcast,
	playlist: state.player.playlist,
	paused: state.player.paused,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(PlayerCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTracker)
