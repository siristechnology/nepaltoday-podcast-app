// @flow

import React, { PureComponent } from 'react'
import { Animated, Text, View } from 'react-native'
import styled from 'styled-components'

import SearchAuthorListItem from '~/components/common/AuthorListItemWithSubjects'
import ErrorMessage from '~/components/common/ErrorMessage'
import Loading from '~/components/common/Loading'
import CONSTANTS from '~/utils/CONSTANTS'
import appStyles from '~/styles'

const Container = styled(View)`
	width: 100%;
	height: 100%;
	flex: 1;
	background-color: ${({ theme }) => theme.colors.backgroundColor};
`

const SearchResultText = styled(Text).attrs({
	numberOfLines: 2,
})`
	margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('15%')};
	margin-vertical: ${({ theme }) => theme.metrics.mediumSize};
	font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
	font-family: CircularStd-Bold;
	color: ${({ theme }) => theme.colors.textColor};
`

type Props = {
	programs: Array<Object>,
	programName: string,
	navigation: Object,
	loading: boolean,
}

class SearchPodcastListComponent extends PureComponent<Props, {}> {
	_authorSearchListPosition = new Animated.ValueXY({
		x: 0,
		y: appStyles.metrics.getHeightFromDP('40%'),
	})

	UNSAFE_componentWillReceiveProps(nextProps: Props) {
		const { loading, podcasts } = nextProps

		const shouldShowList = !loading && podcasts.length > 0

		if (shouldShowList) {
			Animated.spring(this._authorSearchListPosition.y, {
				bounciness: 4,
				toValue: 0,
				speed: 3.5,
				useNativeDriver: true,
			}).start()
		}
	}

	renderSearchProgramsList = (): Object => {
		const { programName, navigation, podcasts } = this.props

		return (
			<Animated.FlatList
				ListHeaderComponent={podcasts.length > 0 && <SearchResultText>{`Results for: '${programName}'`}</SearchResultText>}
				style={[
					{
						transform: [
							{
								translateY: this._authorSearchListPosition.y,
							},
						],
					},
				]}
				renderItem={({ item }) => (
					<SearchAuthorListItem
						onPress={() =>
							navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
								[CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
									program: item.program.id,
								},
								[CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
							})
						}
						numberPodcasts={0}
						profileImage={item.imageUrl}
						program={item.program.id}
						// subjects={item.categories}
						name={item.title}
						id={item._id}
					/>
				)}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => `${item._id}`}
				data={podcasts}
			/>
		)
	}

	render() {
		const { programName, loading, podcasts } = this.props

		return (
			<Container>
				{loading ? <Loading /> : this.renderSearchProgramsList()}
				{!loading && podcasts.length === 0 && <ErrorMessage title={`No results for "${programName}"`} icon="magnify-close" message="" />}
			</Container>
		)
	}
}

export default SearchPodcastListComponent
