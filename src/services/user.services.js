import gql from 'graphql-tag'
import client from '../graphql/graphql-client'

export default class UserService {
	static async googleSignin(accessToken) {
		const result = await client.mutate({
			mutation: gql`
				mutation LOGIN_USER($accessToken: String!) {
					loginUser(loginInput: { accessToken: $accessToken, provider: "google" }) {
						id
						success
					}
				}
			`,
			variables: {
				accessToken: accessToken,
			},
		})

		return result.data.loginUser
	}
}
