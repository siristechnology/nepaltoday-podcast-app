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
					}
				}
			`,
		})

		yield put(DiscoverCreators.getDiscoverSuccess(result.data.getAllPrograms))
	} catch (err) {
		yield put(DiscoverCreators.getDiscoverFailure())
	}
}
