import { put } from 'redux-saga/effects'
import gql from 'graphql-tag'

import client from '../../graphql/graphql-client'
import { Creators as PodcastCreators } from '../ducks/podcast'

export function* getHome() {
	try {
		const result = yield client.query({
			query: gql`
				query homeScreenQuery {
					getTopPodcasts {
						_id
						title
						description
						imageUrl
						originalAudioUrl
						audioUrl
						durationInSeconds
						program{
							id
							title
							imageUrl
						}
						publisher{
							id
							title
							imageUrl
						}
						createdDate
					}
				}
			`,
		})

		yield put(PodcastCreators.getHomeSuccess(result.data.getTopPodcasts))
	} catch (err) {
		yield put(PodcastCreators.getHomeFailure())
	}
}
