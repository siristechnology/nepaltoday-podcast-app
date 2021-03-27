import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks'
import GraphqlClient from './graphql/graphql-client'
import { ThemeContextProvider } from './ThemeContextProvider'
import ApplicationNavigator from './routes'
import store from './store'

import './config/ReactotronConfig'

const App = (): Object => (
	<ApolloProvider client={GraphqlClient}>
		<Provider store={store}>
			<ThemeContextProvider>
				<ApplicationNavigator />
			</ThemeContextProvider>
		</Provider>
	</ApolloProvider>
)
export default App
