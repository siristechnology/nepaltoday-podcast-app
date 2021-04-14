import 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'

import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer'

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer'
import Player from '~/components/common/player/PlayerContainer'
import Podacast from './Podcast'

import { getDefaultHeaderWithTitle, getPlayerNavigationOption } from '~/routes/utils/navigationOptions'
import CONSTANTS from '~/utils/CONSTANTS'

const RootStack = createStackNavigator(
	{
		[CONSTANTS.ROUTES.PODCAST]: {
			screen: Podacast,
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

		[CONSTANTS.ROUTES.AUTHOR_DETAIL]: {
			screen: AuthorDetailContainer,
			navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('', navigation, screenProps),
		},

		[CONSTANTS.ROUTES.PLAYER]: {
			screen: Player,
			navigationOptions: ({ navigation }) => getPlayerNavigationOption(navigation),
		},
	},
	{
		initialRouteName: CONSTANTS.ROUTES.HOME,
		mode: Platform.OS === 'ios' ? 'card' : 'modal',
		headerMode: 'screen',
		defaultNavigationOptions: {
			headerTitleAlign: 'center',
		},
	},
)

export default RootStack
