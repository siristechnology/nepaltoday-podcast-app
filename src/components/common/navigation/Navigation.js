import React, { Fragment } from 'react'
import NavigationBar from './components/navigation-bar/NavigationBar'
import PlayerTracker from './components/PlayerTracker'
import CONSTANTS from '~/utils/CONSTANTS'

const navigationBarItems = [
	{
		label: 'Podcast',
		icon: 'podcast',
		route: CONSTANTS.ROUTES.PODCAST,
	},
	{
		label: 'Discover',
		icon: 'compass',
		route: CONSTANTS.ROUTES.DISCOVER,
	},
	{
		label: 'More',
		icon: 'dots-horizontal-circle-outline',
		route: CONSTANTS.ROUTES.MORE,
	},
]

type Props = {
	navigationState: Object,
	navigation: Object,
}

const onSelectStackRoute = (navigation: Object, route: string): void => navigation.navigate(route)

const Navigation = ({ navigationState, navigation }: Props): Object => {
	const { index, routes } = navigationState
	const routeSelected = routes[index]

	const nameRouteSelected = routeSelected.routes[routeSelected.index].routeName
	const isShowingPlayerScreen = nameRouteSelected === CONSTANTS.ROUTES.PLAYER

	return (
		<Fragment>
			{!isShowingPlayerScreen && (
				<Fragment>
					<PlayerTracker navigation={navigation} />
					<NavigationBar
						onSelectStackRoute={(route) => onSelectStackRoute(navigation, route)}
						stackRouteSelected={index}
						items={navigationBarItems}
					/>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Navigation
