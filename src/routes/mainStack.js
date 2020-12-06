import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

import { withTheme } from 'styled-components';

import Navigation from '~/components/common/navigation/Navigation';
import HomeRoutes from '~/components/screens/home/routes';
import DiscoverRoutes from '~/components/screens/discover/routes'
import LibraryRoutes from '~/components/screens/library/routes';
import SettingsRoutes from '~/components/screens/settings/routes';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
	HOME: 'HOME',
	DISCOVER: 'DISCOVER',
	LIBRARY: 'LIBRARY',
	PROFILE: 'PROFILE',
	SETTINGS: 'SETTINGS',
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

		[ROUTE_NAMES.LIBRARY]: {
			screen: LibraryRoutes,
			headerShown: false,
		},

		[ROUTE_NAMES.SETTINGS]: {
			screen: SettingsRoutes,
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
