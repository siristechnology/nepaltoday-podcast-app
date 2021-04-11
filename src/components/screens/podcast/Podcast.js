import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { gql, useLazyQuery } from '@apollo/client'

import HomeComponent from './components/HomeComponent'
import { Creators as PlayerCreators } from '~/store/ducks/player'

const PodcastContainer = (props) => {
	const [fetchPodcasts, { loading, data, refetch, error, called }] = useLazyQuery(GET_TOP_PODCASTS_QUERY)
	const { podcastsRecentlyPlayed, podcastsDownloaded } = props

	useEffect(() => {
		if (!called) fetchPodcasts()
		else refetch()
	}, [fetchPodcasts, called, refetch])

	const podcastsRecentlyPlayedWithDownloadStatus = (data?.getTopPodcasts || []).map((podcast) => {
		const isDownloaded = podcastsDownloaded.some((pd) => pd._id === podcast._id)
		const currentPosition = podcastsRecentlyPlayed.find((pr) => pr._id === podcast._id)?.currentPosition || 0

		return {
			...podcast,
			isDownloaded,
			currentPosition,
		}
	})

	return (
		<HomeComponent
			navigation={props.navigation}
			onRefresh={refetch}
			loading={loading}
			error={error}
			data={podcastsRecentlyPlayedWithDownloadStatus}
		/>
	)
}

const GET_TOP_PODCASTS_QUERY = gql`
	query homeScreenQuery {
		getTopPodcasts {
			_id
			title
			description
			imageUrl
			originalAudioUrl
			audioUrl
			durationInSeconds
			category
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
`

const mapDispatchToProps = (dispatch) => bindActionCreators(PlayerCreators, dispatch)

const mapStateToProps = (state) => ({
	podcastsRecentlyPlayed: state.localPodcastsManager.podcastsRecentlyPlayed,
	podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
})

export default connect(mapStateToProps, mapDispatchToProps)(PodcastContainer)
