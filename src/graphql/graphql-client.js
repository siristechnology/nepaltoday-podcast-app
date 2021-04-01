import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import fetch from 'node-fetch'
import crashlytics from '@react-native-firebase/crashlytics'
import { SERVER_URL } from 'react-native-dotenv'

const cache = new InMemoryCache()

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
			let handle
			Promise.resolve(operation)
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					})
				})
				.catch(observer.error.bind(observer))

			return () => {
				if (handle) handle.unsubscribe()
			}
		}),
)

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.forEach((error) => crashlytics().recordError(new Error(error.message)))
			}

			if (networkError) {
				crashlytics().recordError(new Error(networkError.message))
			}
		}),
		requestLink,
		withClientState({
			defaults: {
				isConnected: true,
			},
			resolvers: {
				Mutation: {
					updateNetworkStatus: (_, { isConnected }, { cache }) => {
						cache.writeData({ data: { isConnected } })
						return null
					},
				},
			},
			cache,
		}),
		new HttpLink({
			uri: SERVER_URL,
			credentials: 'include',
			fetch,
		}),
	]),
	cache,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
	},
})

export default client
