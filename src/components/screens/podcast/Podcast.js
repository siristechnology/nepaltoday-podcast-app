import React from 'react'
import { gql, useQuery } from '@apollo/client'
import HomeComponent from './components/HomeComponent'

const PodcastContainer = ({ navigation }) => {
	const { loading, data, refetch, error } = useQuery(GET_TOP_PODCASTS_QUERY)

	return <HomeComponent navigation={navigation} onRefresh={refetch} loading={loading} error={error} data={data?.getTopPodcasts} />
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
