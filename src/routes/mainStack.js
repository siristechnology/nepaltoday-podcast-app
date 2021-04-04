import React from 'react'
import { createAppContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-bottom-tabs'

import Navigation from '~/components/common/navigation/Navigation'
import PodcastRoutes from '~/components/screens/podcast/routes'
import DiscoverRoutes from '~/components/screens/discover/routes'
import MoreRoutes from '~/components/screens/more/routes'

export const ROUTE_NAMES = {
	PODCAST: 'PODCAST',
	DISCOVER: 'DISCOVER',
	LIBRARY: 'LIBRARY',
	MORE: 'MORE',
}

const ApplicationTabs = createMaterialTopTabNavigator(
	{
		[ROUTE_NAMES.PODCAST]: {
			screen: PodcastRoutes,
			headerShown: false,
		},

		[ROUTE_NAMES.DISCOVER]: {
			screen: DiscoverRoutes,
			headerShown: false,
		},

		[ROUTE_NAMES.MORE]: {
			screen: MoreRoutes,
			headerShown: false,
		},
	},
	{
		tabBarComponent: ({ navigationState, navigation }) => <Navigation navigationState={navigationState} navigation={navigation} />,
		initialRouteName: ROUTE_NAMES.PODCAST,
		tabBarPosition: 'bottom',
		animationEnabled: true,
		swipeEnabled: false,
		lazy: false,
	},
)

const AppContainer = createAppContainer(ApplicationTabs)

export default AppContainer
