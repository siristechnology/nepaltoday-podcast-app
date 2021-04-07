import { ApolloClient, concat, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { InvalidationPolicyCache } from 'apollo-invalidation-policies'
import crashlytics from '@react-native-firebase/crashlytics'
import { SERVER_URL } from 'react-native-dotenv'

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach((error) => crashlytics().recordError(new Error(error.message)))
	}

	if (networkError) {
		crashlytics().recordError(new Error(networkError.message))
	}
})

const httpLink = new HttpLink({ uri: SERVER_URL })

const client = new ApolloClient({
	link: concat(errorLink, httpLink),
	cache: new InvalidationPolicyCache({
		invalidationPolicies: {
			timeToLive: 60000,
		},
	}),
})

export default client
