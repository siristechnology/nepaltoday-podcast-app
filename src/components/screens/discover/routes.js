import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'

import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer'
import SearchPodcastListContainer from './components/search-podcasts/SearchPodcastListContainer'

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer'
import Player from '~/components/common/player/PlayerContainer'
import Discover from './Discover'

import { getDefaultHeaderWithTitle, getPlayerNavigationOption, getHiddenHeaderLayout } from '~/routes/utils/navigationOptions'
import CONSTANTS from '~/utils/CONSTANTS'
import Program from './components/program/Program'

const LOCAL_STACK_ROUTES = {
	TRENDING_AUTHORS_SEE_ALL: 'TRENDING_AUTHORS_SEE_ALL',
	HOTTEST_PODCASTS_SEE_ALL: 'HOTTEST_PODCASTS_SEE_ALL',
	NEW_RELEASES_SEE_ALL: 'NEW_RELEASES_SEE_ALL',
	SEARCH_AUTHORS_RESULT: 'SEARCH_AUTHORS_RESULT',
	PROGRAM_CATEGORIES_SEE_ALL: 'PROGRAM_CATEGORIES_SEE_ALL',
}

const RootStack = createStackNavigator(
	{
		[CONSTANTS.ROUTES.DISCOVER]: {
			screen: (props) => <Discover {...props} LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES} />,
			navigationOptions: () => ({
				headerShown: false,
				headerBackTitle: null,
				headerTransparent: true,
			}),
		},

		[CONSTANTS.ROUTES.PODCAST_DETAIL]: {
			screen: PodcastDetailContainer,
			navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('', navigation, screenProps),
		},

		[LOCAL_STACK_ROUTES.PROGRAM_CATEGORIES_SEE_ALL]: {
			screen: Program,
			navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('', navigation, screenProps),
		},

		[LOCAL_STACK_ROUTES.SEARCH_AUTHORS_RESULT]: {
			screen: SearchPodcastListContainer,
			navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Search Podcasts', navigation, screenProps),
		},

		[CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
			screen: AuthorDetailContainer,
			navigationOptions: ({ screenProps }) => getHiddenHeaderLayout(screenProps),
		},

		[CONSTANTS.ROUTES.PLAYER]: {
			screen: Player,
			navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
		},
	},
	{
		initialRouteName: CONSTANTS.ROUTES.DISCOVER,
		mode: Platform.OS === 'ios' ? 'card' : 'modal',
		headerMode: 'screen',
		defaultNavigationOptions: {
			headerTitleAlign: 'center',
		},
	},
)

export default RootStack
