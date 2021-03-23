import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

import Navigation from '~/components/common/navigation/Navigation';
import HomeRoutes from '~/components/screens/home/routes';
import DiscoverRoutes from '~/components/screens/discover/routes'
import MoreRoutes from '~/components/screens/more/routes'

export const ROUTE_NAMES = {
	HOME: 'HOME',
	DISCOVER: 'DISCOVER',
	LIBRARY: 'LIBRARY',
	MORE: 'MORE',
}

const ApplicationTabs = createMaterialTopTabNavigator(
	{
		[ROUTE_NAMES.HOME]: {
			screen: HomeRoutes,
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
		initialRouteName: ROUTE_NAMES.HOME,
		tabBarPosition: 'bottom',
		animationEnabled: true,
		swipeEnabled: false,
		lazy: false,
	},
)

const AppContainer = createAppContainer(ApplicationTabs);

export default AppContainer;
