import React from 'react'
import { TouchableOpacity, Platform, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components'

import Icon from '~/components/common/Icon'
import appStyles from '~/styles'
import { getRelativeTime } from '~/utils/time'

const Wrapper = styled(View)`
	width: 100%;
	flex-direction: row;
	align-items: center;
	margin: ${({ theme }) => theme.metrics.mediumSize}px;
`

const CardWrapper = styled(View)`
	width: 80%;
	padding: ${({ theme }) => theme.metrics.mediumSize}px;
	margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
	padding-left: ${({ theme }) => theme.metrics.mediumSize + theme.metrics.getWidthFromDP('12%')}px;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 5px;
	shadow-color: #000;
	shadow-opacity: 0.25;
	shadow-radius: 3.84;
	elevation: 5;
`

const ProfileImage = styled(FastImage).attrs(({ uri }) => ({
	source: { uri },
}))`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
	height: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
	border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
	position: absolute;
	shadow-color: #000;
	shadow-opacity: 0.25;
	shadow-radius: 3.84;
	elevation: 6;
`

const AuthorName = styled(Text)`
	font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
	font-family: CircularStd-Black;
	color: ${({ theme }) => theme.colors.darkText};
`

const Description = styled(Text).attrs({
	numberOfLines: 2,
})`
	font-size: ${({ theme }) => theme.metrics.largeSize}px;
	font-family: CircularStd-Black;
	color: ${({ theme }) => theme.colors.subText};
`

const SourceTimeText = styled(Text)`
	font-size: ${({ theme }) => theme.metrics.mediumSize}px;
	color: ${({ theme }) => theme.colors.subText};
`

const DetailButton = styled(TouchableOpacity)`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
	height: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
	justify-content: center;
	align-items: center;
	align-self: flex-end;
	margin-top: ${({ theme }) => theme.metrics.smallSize}px;
	padding-top: ${({ theme }) => (Platform.OS === 'ios' ? 2 : 0)}px;
	border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
	background-color: ${({ theme }) => theme.colors.primaryColor};
`

type Props = {
	subjects: Array<string>,
	profileImage: string,
	onPress: Function,
	name: string,
}

const SearchPodcastListItem = ({ podcast, onPress }: Props): Object => (
	<Wrapper>
		<CardWrapper>
			<AuthorName>{podcast.program.title}</AuthorName>
			<AuthorName>{podcast.title}</AuthorName>
			<Description>{podcast.description}</Description>
			<SourceTimeText>{getRelativeTime(podcast.createdDate)}</SourceTimeText>
			<DetailButton onPress={onPress}>
				<Icon color={appStyles.colors.white} name="magnify" size={24} />
			</DetailButton>
		</CardWrapper>
		<ProfileImage uri={podcast.imageUrl} />
	</Wrapper>
)

export default SearchPodcastListItem
