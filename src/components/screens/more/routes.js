import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'

import { getPlayerNavigationOption, getDefaultHeaderWithTitle } from '~/routes/utils/navigationOptions'
import Player from '~/components/common/player/PlayerContainer'
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
			navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Downloads', navigation, screenProps),
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

RootStack.navigationOptions = ({ navigation }) => {
	const tabBarVisible = navigation.state.index <= 0

	return {
		tabBarVisible,
	}
}

export default RootStack
