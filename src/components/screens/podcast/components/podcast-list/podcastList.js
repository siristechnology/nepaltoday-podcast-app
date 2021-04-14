import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { Creators as PlayerCreators } from '~/store/ducks/player'

import CONSTANTS from '~/utils/CONSTANTS'
import PodcastListItem from './podcastListItem'

const Wrapper = styled(View)`
	width: 100%;
	flex: 1;
`

const AllPodcastList = styled(FlatList)`
	width: 100%;
	flex: 1;
`

const PodcastList = ({ navigation, data, headerComponent, refreshControl, currentPodcast, setPodcast, pause }) => {
	const onItemPress = (item) => {
		navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
			[CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
			[CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
		})
	}

	const onPodcastPlay = (podcast, playlist) => {
		playlist = playlist.filter((p) => p._id != podcast._id)
		playlist.unshift(podcast)

		setPodcast(playlist)
	}

	return (
		<Wrapper>
			<AllPodcastList
				keyExtractor={(podcast) => `${podcast._id}`}
				data={data}
				renderItem={({ item, index }) => (
					<PodcastListItem
						podcastDetail={item}
						onPress={() => onItemPress(item)}
						onPodcastPlay={() => onPodcastPlay(item, data)}
						onPodcastPause={pause}
						isLastIndex={index === data.length - 1}
						isCurrentlyPlaying={item._id === currentPodcast?._id}
						navigation={navigation}
					/>
				)}
				ListHeaderComponent={headerComponent}
				refreshControl={refreshControl}
			/>
		</Wrapper>
	)
}

const mapStateToProps = ({ state }) => ({
	currentPodcast: state?.player?.currentPodcast,
	setPodcast: state?.setPodcast,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(PlayerCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PodcastList)
