import React from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components'

const Wrapper = styled(View)`
	width: 100%;
	flex-direction: row;
	align-items: flex-start;
	padding: ${({ theme }) => theme.metrics.mediumSize}px;
	background-color: ${({ theme }) => theme.colors.backgroundColor};
`
const InfoWrapper = styled(View)`
	width: 100%;
	flex-direction: row;
	align-items: flex-start;
	margin-bottom: 10px;
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

const SubjectWrapper = styled(View)`
	align-items: flex-start;
`

const PodcastSubjectText = styled(Text)`
	color: ${({ theme }) => theme.colors.white};
	font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
	font-family: CircularStd-Bold;
	margin: ${({ theme }) => theme.metrics.extraSmallSize}px;
	background-color: ${({ theme }) => theme.colors.black};
`

type Props = {
	imageURL: string,
	title: string,
	category: string,
}

const ProgramInfo = ({ program, onSubscribe }: Props) => {
	if (!program.title) return <></>

	return (
		<Wrapper>
			<InfoWrapper>
				<PodcastImage uri={program.imageURL || ''} />
				<TextContentWrapper>
					<PodcastTitleText>{program.title || ''}</PodcastTitleText>
					<SubjectWrapper>
						<PodcastSubjectText>{`#${program.category || ''}`}</PodcastSubjectText>
						<PodcastSubjectText>{`#${program.publisher || ''}`}</PodcastSubjectText>
					</SubjectWrapper>
				</TextContentWrapper>
			</InfoWrapper>
			{/* <ActionButtons onSubscribe={onSubscribe} /> */}
		</Wrapper>
	)
}

export default ProgramInfo
