import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import GraphqlClient from './graphql/graphql-client'
import { ThemeContextProvider } from './ThemeContextProvider'
import ApplicationNavigator from './routes'
import store from './store'

import './config/ReactotronConfig'

const App = () => (
	<ApolloProvider client={GraphqlClient}>
		<Provider store={store}>
			<ThemeContextProvider>
				<ApplicationNavigator />
			</ThemeContextProvider>
		</Provider>
	</ApolloProvider>
)
export default App
