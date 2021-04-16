import React, { PureComponent } from 'react'
import { FlatList, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Creators as PlayerCreators } from '~/store/ducks/player'
import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions'
import PodcastsDownloadedListItem from '~/components/common/PodcastListItem'
import CONSTANTS from '~/utils/CONSTANTS'

const Wrapper = styled(View)`
	width: 100%;
	height: 100%;
	flex: 1;
	background-color: ${({ theme }) => theme.colors.backgroundColor};
`

const PodcastsDownloadedList = styled(FlatList)`
	width: 100%;
	height: 100%;
	padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`

type Props = {
	podcastsDownloaded: Array<Object>,
	navigation: Object,
}

class PodcastsDownloaded extends PureComponent<Props, {}> {
	componentDidMount() {
		const { podcastsDownloaded, navigation } = this.props
		const { params } = navigation.state

		setHeaderPlayButtonPress(podcastsDownloaded, navigation)
	}

	render() {
		const { setPodcast, pause, currentPodcast, paused, podcastsDownloaded, navigation } = this.props

		return (
			<Wrapper>
				<PodcastsDownloadedList
					renderItem={({ item, index }) => (
						<PodcastsDownloadedListItem
							onPressItem={() =>
								navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
									[CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
									[CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
								})
							}
							setPodcast={setPodcast}
							pause={pause}
							currentPodcast={currentPodcast}
							paused={paused}
							navigation={navigation}
							shouldShowDownloadStatus
							isDownloading={false}
							index={index + 1}
							podcast={item}
							roundedImage
						/>
					)}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => `${item._id}`}
					data={podcastsDownloaded}
				/>
			</Wrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
	currentPodcast: state.player.currentPodcast,
	paused: state.player.paused,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(PlayerCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PodcastsDownloaded)
