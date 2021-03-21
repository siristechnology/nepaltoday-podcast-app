// @flow

import React from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components'

import ReviewStars from '~/components/common/ReviewStars'

const Wrapper = styled(View)`
	width: 100%;
	flex-direction: row;
	align-items: flex-start;
`

const TextContentWrapper = styled(View)`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('65%')}px;
	padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
	align-items: flex-start;
`

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
	source: { uri },
}))`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
	height: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
	border-radius: 8px;
`

const PodcastTitleText = styled(Text).attrs({
	numberOfLines: 4,
})`
	margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
	font-size: ${({ theme }) => theme.metrics.largeSize * 1.8}px;
	color: ${({ theme }) => theme.colors.textColor};
	font-family: CircularStd-Bold;
`

const PodcastSubjectText = styled(Text)`
	color: ${({ theme }) => theme.colors.white};
	font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
	font-family: CircularStd-Bold;
`

const SubjectWrapper = styled(View)`
	align-items: flex-start;
	margin-top: ${({ theme }) => theme.metrics.smallSize}px;
`

const SubjectTextWrapper = styled(View)`
	padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
	padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
	border-radius: 3px;
	background-color: ${({ theme }) => theme.colors.black};
`

type Props = {
	imageURL: string,
	subject: string,
	title: string,
}

const PodcastInfo = ({ imageURL, subject, title }: Props): Object => (
	<Wrapper>
		<PodcastImage uri={imageURL} />
		<TextContentWrapper>
			<PodcastTitleText>{title}</PodcastTitleText>

			<SubjectWrapper>
				<SubjectTextWrapper>
					<PodcastSubjectText>{`#${subject}`}</PodcastSubjectText>
				</SubjectTextWrapper>
			</SubjectWrapper>
		</TextContentWrapper>
	</Wrapper>
)

export default PodcastInfo
