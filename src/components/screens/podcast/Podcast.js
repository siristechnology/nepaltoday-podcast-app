import React, { useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import HomeComponent from './components/HomeComponent'

const PodcastContainer = (props) => {
	const [fetchPodcasts, { loading, data, refetch, error, called }] = useLazyQuery(GET_TOP_PODCASTS_QUERY)

	useEffect(() => {
		if (!called) fetchPodcasts()
		else refetch()
	}, [fetchPodcasts, called, refetch])

	return <HomeComponent navigation={props.navigation} onRefresh={refetch} loading={loading} error={error} data={data?.getTopPodcasts} />
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

export default PodcastContainer
