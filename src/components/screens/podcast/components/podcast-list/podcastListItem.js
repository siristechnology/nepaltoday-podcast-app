import React from 'react'
import { withTheme } from 'styled-components'
import Icon from '~/components/common/Icon'
import { getFormattedDurationFromSeconds, getRelativeTime } from '~/utils/time'
import {
	Container,
	TitleWrapper,
	PodcastImage,
	Title,
	Description,
	DurationText,
	RightButtonWrapper,
	SourceTimeText,
	LeftWrapper,
	RelativeTimeWrapper,
} from './podcastListItem.styles'

type Props = {
	podcastDetail: Object,
	isLastIndex: boolean,
	onPress: Function,
}

const PodcastListItem = ({ podcastDetail, isLastIndex, onPress, onPodcastPlay, navigation, theme }: Props) => {
	return (
		<Container isLastIndex={isLastIndex}>
			<LeftWrapper onPress={onPress}>
				<PodcastImage uri={podcastDetail.imageUrl} />
				<TitleWrapper>
					<RelativeTimeWrapper>
						<SourceTimeText>{getRelativeTime(podcastDetail.createdDate)}</SourceTimeText>
					</RelativeTimeWrapper>
					<Title>{podcastDetail.title}</Title>
					<Description>{podcastDetail.description}</Description>
				</TitleWrapper>
			</LeftWrapper>
			<RightButtonWrapper onPress={() => onPodcastPlay(podcastDetail)}>
				<Icon name="play-circle-outline" size={40} />
				<DurationText>{getFormattedDurationFromSeconds(podcastDetail.durationInSeconds)}</DurationText>
			</RightButtonWrapper>
		</Container>
	)
}

export default withTheme(PodcastListItem)
