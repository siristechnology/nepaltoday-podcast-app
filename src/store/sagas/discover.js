import { put } from 'redux-saga/effects'
import gql from 'graphql-tag'

import client from '../../graphql/graphql-client'
import { Creators as DiscoverCreators } from '../ducks/discover'

export function* getDiscover() {
	try {
		const result = yield client.query({
			query: gql`
				query homeScreenQuery {
					getAllPrograms {
						id
						title
						imageUrl
						category
						weight
						publisher {
							id
							title
							imageUrl
						}
					}
				}
			`,
		})

		yield put(DiscoverCreators.getDiscoverSuccess(result.data.getAllPrograms))
	} catch (err) {
		yield put(DiscoverCreators.getDiscoverFailure())
	}
}

export function* searchPodcasts({ payload: { searchTerm } }) {
	try {
		const result = yield client.query({
			query: gql`
				query searchPodcastsQuery($searchTerm: String!) {
					searchPodcasts(searchTerm: $searchTerm) {
						_id
						title
						description
						imageUrl
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
					}
				}
			`,
			variables: { searchTerm },
		})

		yield put(DiscoverCreators.searchPodcastsSuccess(result.data.searchPodcasts))
	} catch (err) {
		yield put(DiscoverCreators.searchPodcastsFailure())
	}
}
