import React from 'react'

import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { withTheme } from 'styled-components'

import StarterScreen from '~/components/screens/StaterScreen'
import CONSTANTS from '../utils/CONSTANTS'
import MainStack from './mainStack'

const InitialStack = createSwitchNavigator(
	{
		[CONSTANTS.ROUTES.STARTER_SCREEN]: {
			screen: StarterScreen,
		},

		[CONSTANTS.ROUTES.MAIN_STACK]: {
			screen: MainStack,
		},
	},
	{
		initialRouteName: CONSTANTS.ROUTES.STARTER_SCREEN,
	},
)

const AppContainer = createAppContainer(InitialStack)

export default withTheme(({ theme }) => <AppContainer screenProps={{ theme }} />)
