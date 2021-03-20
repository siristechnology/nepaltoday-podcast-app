import React from 'react'
import { Platform, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components'
import appIconImg from '~/../android/app/src/main/ic_launcher-playstore.png'

const Wrapper = styled(View)`
	width: 100%;
	justify-content: center;
	align-items: center;
	padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`

const IconWrapper = styled(View)`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
	height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
	justify-content: center;
	align-items: center;
	padding-top: ${({ theme }) => (Platform.OS === 'ios' ? theme.metrics.mediumSize : 0)}px;
	border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
	background-color: #e7f2fe;
`

const AppIcon = styled(FastImage).attrs(({ source }) => ({
	source: source,
}))`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
	height: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
	border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8.5%')}px;
`

const Title = styled(Text)`
	margin-top: ${({ theme }) => 1.2 * theme.metrics.extraLargeSize}px;
	margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
	color: ${({ theme }) => theme.colors.darkText};
	font-size: ${({ theme }) => 1.3 * theme.metrics.extraLargeSize};
	font-family: CircularStd-Black;
`

const Description = styled(Text)`
	font-size: ${({ theme }) => 1.2 * theme.metrics.largeSize}px;
	font-family: CircularStd-Medium;
	color: ${({ theme }) => theme.colors.subTextWhite};
	text-align: center;
`

const SCREEN_TEXT = {
	title: 'NepalToday Podcast',
	description: 'Download your favorite podcasts on Nepali news, politics, interviews, stories to listen offline.',
}

const MiddleContent = () => {
	const { title, description } = SCREEN_TEXT

	return (
		<Wrapper>
			<IconWrapper>
				<AppIcon source={appIconImg} />
			</IconWrapper>
			<Title>{title}</Title>
			<Description>{description}</Description>
		</Wrapper>
	)
}

export default MiddleContent
