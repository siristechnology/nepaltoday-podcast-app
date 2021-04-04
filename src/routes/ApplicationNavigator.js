import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'styled-components'
import CONSTANTS from '~/utils/CONSTANTS'

import StarterScreen from '~/components/screens/StaterScreen'
import Login from '~/components/screens/login/Login'
import MainStack from './mainStack'

const Stack = createStackNavigator()

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={CONSTANTS.ROUTES.STARTER_SCREEN}>
				<Stack.Screen name={CONSTANTS.ROUTES.STARTER_SCREEN} component={StarterScreen} />
				<Stack.Screen name={CONSTANTS.ROUTES.LOGIN} component={Login} />
				<Stack.Screen name={CONSTANTS.ROUTES.MAIN_STACK} component={MainStack} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default withTheme(({ theme }) => <App screenProps={{ theme }} />)
