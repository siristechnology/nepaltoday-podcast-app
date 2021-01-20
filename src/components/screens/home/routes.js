import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native';

import AuthorDetailContainer from '~/components/common/author-detail/AuthorDetailContainer';

import PodcastDetailContainer from '~/components/common/podcast-detail/PodcastDetailContainer';
import Player from '~/components/common/player/PlayerContainer';
import Home from './Home';

import {
  getDefaultHeaderWithButton,
  getDefaultHeaderWithTitle,
  getPlayerNavigationOption,
  getHiddenHeaderLayout,
} from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const LOCAL_STACK_ROUTES = {
  TRENDING_AUTHORS_SEE_ALL: 'TRENDING_AUTHORS_SEE_ALL',
  HOTTEST_PODCASTS_SEE_ALL: 'HOTTEST_PODCASTS_SEE_ALL',
  NEW_RELEASES_SEE_ALL: 'NEW_RELEASES_SEE_ALL',
};

const RootStack = createStackNavigator(
	{
		[CONSTANTS.ROUTES.HOME]: {
			screen: (props) => <Home {...props} LOCAL_STACK_ROUTES={LOCAL_STACK_ROUTES} />,
			navigationOptions: () => ({
				headerShown: false,
				headerBackTitle: null,
				headerTransparent: true,
			}),
		},

		[CONSTANTS.ROUTES.PODCAST_DETAIL]: {
			screen: PodcastDetailContainer,
			navigationOptions: ({ navigation, screenProps }) => getDefaultHeaderWithTitle('Podcast Detail', navigation, screenProps),
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
		initialRouteName: CONSTANTS.ROUTES.HOME,
		mode: Platform.OS === 'ios' ? 'card' : 'modal',
		headerMode: 'screen',
		defaultNavigationOptions: {
			headerTitleAlign: 'center',
		},
	},
)

export default RootStack;
