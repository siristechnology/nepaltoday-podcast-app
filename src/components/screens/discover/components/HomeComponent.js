// @flow

import React from 'react'
import { ScrollView, RefreshControl, View, Text } from 'react-native'
import styled, { withTheme } from 'styled-components'

import ErrorMessage from '~/components/common/ErrorMessage'
import ScreenTitle from '~/components/common/ScreenTitle'
import SearchAuthorTextInput from './SearchAuthorTextInput'
import Loading from '~/components/common/Loading'
import appStyles from '~/styles'
import ProgramCategoriesDiscover from './program/ProgramCategories'

const Wrapper = styled(View)`
	width: 100%;
	height: 100%;
	flex: 1;
	background-color: ${({ theme }) => theme.colors.secondaryColor};
`

const CategoryWrapper = styled(View)`
	margin-top: 10px;
	margin-bottom: 10px;
`

const CategoryText = styled(Text)`
	width: 100%;
	margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
	font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
	font-family: CircularStd-Bold;
	color: ${({ theme }) => theme.colors.textColor};
	margin-left: 15px;
`

const SearchAuthorTextInputWrapper = styled(View)`
	width: 100%;
	padding-right: ${({ theme }) => theme.metrics.largeSize}px;
	padding-left: ${({ theme }) => theme.metrics.largeSize}px;
`

const HomeComponent = ({ navigation, loading, error, data, getHome, onTypeAuthorName, onSearchForAuthor, onToggleDarkLayer }) => (
	<Wrapper>
		{loading && !error && <Loading />}
		{!loading && error && (
			<ErrorMessage
				message="Seems like you're having some troubles when trying to connect with the server."
				icon="server-network-off"
				title="Oops..."
			/>
		)}
		{!loading && !error && (
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						progressBackgroundColor={appStyles.colors.primaryColor}
						tintColor={appStyles.colors.primaryColor}
						colors={[appStyles.colors.white]}
						refreshing={loading && !error}
						onRefresh={getHome}
					/>
				}
			>
				<ScreenTitle title="Discover" />
				<SearchAuthorTextInputWrapper>
					<SearchAuthorTextInput
						onSearchForAuthor={onSearchForAuthor}
						onToggleDarkLayer={onToggleDarkLayer}
						onTypeAuthorName={onTypeAuthorName}
					/>
				</SearchAuthorTextInputWrapper>
				{data &&
					data.length &&
					Array.from(new Set(data.map((p) => p.category))).map((category) => (
						<CategoryWrapper key={category}>
							<CategoryText>{category}</CategoryText>
							<ProgramCategoriesDiscover data={data.filter((d) => d.category == category)} navigation={navigation} />
						</CategoryWrapper>
					))}
			</ScrollView>
		)}
	</Wrapper>
)

export default HomeComponent
