import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'

import { getDefaultHeaderWithTitle, getDefaultHeaderWithButton } from '~/routes/utils/navigationOptions'
import PodcastsDownloaded from './downloads/PodcastsDownloaded'
import RecentlyPlayed from './history/RecentlyPlayed'

import CONSTANTS from '~/utils/CONSTANTS'

import More from './More'
import About from './about/About'

const LOCAL_STACK_ROUTES = {
	ABOUT: 'ABOUT',
	PODCASTS_DOWNLOADED: 'PODCASTS_DOWNLOADED',
	RECENTLY_PLAYED: 'RECENTLY_PLAYED',
}

const RootStack = createStackNavigator(
	{
		[CONSTANTS.ROUTES.MORE]: {
			screen: (props) => <More {...props} LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES} />,
			navigationOptions: () => ({
				headerBackTitle: null,
				headerShown: false,
			}),
		},

		[LOCAL_STACK_ROUTES.PODCASTS_DOWNLOADED]: {
			screen: PodcastsDownloaded,
			navigationOptions: ({ navigation, screenProps }) =>
				getDefaultHeaderWithButton(navigation, screenProps, 'Downloads', 'play-circle-outline'),
		},

		[LOCAL_STACK_ROUTES.RECENTLY_PLAYED]: {
			screen: RecentlyPlayed,
			navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Recently Played', navigation, screenProps),
		},

		[LOCAL_STACK_ROUTES.ABOUT]: {
			screen: About,
			navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('About', navigation, screenProps),
		},
	},
	{
		initialRouteName: CONSTANTS.ROUTES.MORE,
		mode: Platform.OS === 'ios' ? 'card' : 'modal',
		headerMode: 'screen',
		defaultNavigationOptions: {
			headerTitleAlign: 'center',
		},
	},
)

export default RootStack
