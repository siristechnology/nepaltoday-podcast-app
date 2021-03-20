// @flow

import React from 'react'
import { RefreshControl, View } from 'react-native'
import styled from 'styled-components'

import ErrorMessage from '~/components/common/ErrorMessage'
import ScreenTitle from '~/components/common/ScreenTitle'
import Loading from '~/components/common/Loading'
import appStyles from '~/styles'
import PodcastList from './podcast-list/podcastList'

const Wrapper = styled(View)`
	width: 100%;
	height: 100%;
	flex: 1;
	background-color: ${({ theme }) => theme.colors.secondaryColor};
`

type Data = {
	podcasts: Array<Object>,
}

type Props = {
	navigation: Object,
	getHome: Function,
	loading: boolean,
	error: boolean,
	data: Data,
}

const HomeComponent = ({ navigation, loading, error, data, getHome }: Props): Object => (
	<Wrapper>
		{loading && !error && <Loading />}
		{!loading && error && (
			<ErrorMessage
				message="Seems like you're having some troubles when trying to connect with the server."
				icon="server-network-off"
				title="Oops..."
			/>
		)}
		{!loading && !error && data.podcasts && data.podcasts.length > 0 && (
			<PodcastList
				data={data.podcasts}
				navigation={navigation}
				headerComponent={<ScreenTitle title="Home" />}
				refreshControl={
					<RefreshControl
						progressBackgroundColor={appStyles.colors.primaryColor}
						tintColor={appStyles.colors.primaryColor}
						colors={[appStyles.colors.white]}
						refreshing={loading && !error}
						onRefresh={getHome}
					/>
				}
			/>
		)}
	</Wrapper>
)

export default HomeComponent
