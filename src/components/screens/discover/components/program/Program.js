import React, { useEffect } from 'react'
import { FlatList, View, RefreshControl } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { gql, useLazyQuery } from '@apollo/client'
import styled from 'styled-components'

import { Creators as PlayerCreators } from '~/store/ducks/player'
import PodcastListItem from '~/components/common/PodcastListItem'
import CONSTANTS from '~/utils/CONSTANTS'
import appStyles from '~/styles'
import ProgramInfo from './components/ProgramInfo'

const Wrapper = styled(View)`
	width: 100%;
	height: 100%;
	flex: 1;
	padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
	padding-right: ${({ theme }) => theme.metrics.mediumSize}px;
	background-color: ${({ theme }) => theme.colors.backgroundColor};
`
const Program = ({ navigation, setPodcast, pause, currentPodcast, paused }) => {
	const { programId } = navigation.state.params

	const [fetchProgramDetails, { loading, data, refetch, error, called }] = useLazyQuery(GET_PROGRAM_DETAILS_QUERY, {
		variables: {
			id: programId,
		},
	})

	const program = data?.getProgramDetail || {}

	useEffect(() => {
		if (!called) fetchProgramDetails()
		else refetch()
	}, [fetchProgramDetails, called, refetch])

	const onPlayAll = () => {
		setPodcast(program.podcasts)
	}

	return (
		<Wrapper>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={program?.podcasts}
				ListHeaderComponent={<ProgramInfo program={program} onPlayAll={onPlayAll} />}
				renderItem={({ item, index }) => (
					<PodcastListItem
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
						shouldShowDownloadStatus={false}
						roundedImage={false}
						podcast={item}
						index={index + 1}
						navigation={navigation}
					/>
				)}
				keyExtractor={(podcast) => `${podcast._id}`}
				refreshControl={
					<RefreshControl
						onRefresh={refetch}
						refreshing={loading}
						progressBackgroundColor={appStyles.colors.primaryColor}
						tintColor={appStyles.colors.primaryColor}
						colors={[appStyles.colors.white]}
					/>
				}
			/>
		</Wrapper>
	)
}

const GET_PROGRAM_DETAILS_QUERY = gql`
	query getProgramDetail($id: String!) {
		getProgramDetail(id: $id) {
			id
			title
			imageUrl
			category
			publisher {
				id
				title
				imageUrl
			}
			podcasts {
				_id
				title
				audioUrl
				durationInSeconds
				description
				category
				imageUrl
				program {
					id
					title
					imageUrl
				}
				publisher {
					id
					title
					imageUrl
				}
				createdDate
			}
		}
	}
`

const mapDispatchToProps = (dispatch) => bindActionCreators(PlayerCreators, dispatch)

const mapStateToProps = (state) => ({
	currentPodcast: state.player.currentPodcast,
	paused: state.player.paused,
	podcastsRecentlyPlayed: state.localPodcastsManager.podcastsRecentlyPlayed,
	podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
})

export default connect(mapStateToProps, mapDispatchToProps)(Program)
