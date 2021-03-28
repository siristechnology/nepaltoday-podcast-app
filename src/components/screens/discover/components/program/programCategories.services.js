import gql from 'graphql-tag'

import client from '~/graphql/graphql-client'

export default class CategoriesService {
	static async getProgramPodcast(id) {
		const result = await client.query({
			query: gql`
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
			`,
			variables: {
				id: id,
			},
		})

		return result.data.getProgramDetail
	}
}
