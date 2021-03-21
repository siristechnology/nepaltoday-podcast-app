// @flow

import React, { Fragment } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import NavigationBar from './components/navigation-bar/NavigationBar';
import PlayerTracker from './components/PlayerTracker';

import CONSTANTS from '~/utils/CONSTANTS';

const navigationBarItems = [
	{
		label: 'Home',
		icon: 'home',
		route: CONSTANTS.ROUTES.HOME,
	},
	{
		label: 'Discover',
		icon: 'compass',
		route: CONSTANTS.ROUTES.DISCOVER,
	},
	{
		label: 'Profile',
		icon: 'account',
		route: CONSTANTS.ROUTES.PROFILE,
	},
]

type Props = {
  navigationState: Object,
  navigation: Object,
};

const onSelectStackRoute = (navigation: Object, route: string): void => navigation.navigate(route);

const Navigation = ({ navigationState, navigation }: Props): Object => {
  const { index, routes } = navigationState;
  const routeSelected = routes[index];

  const nameRouteSelected = routeSelected.routes[routeSelected.index].routeName;
  const isShowingPlayerScreen = nameRouteSelected === CONSTANTS.ROUTES.PLAYER;

  return (
    <Fragment>
      {!isShowingPlayerScreen && (
        <Fragment>
          <PlayerTracker
            navigation={navigation}
          />
          <NavigationBar
            onSelectStackRoute={route => onSelectStackRoute(navigation, route)}
            stackRouteSelected={index}
            items={navigationBarItems}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Navigation;
