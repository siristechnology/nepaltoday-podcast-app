import React from 'react'
import { withTheme } from 'styled-components'
import Icon from '~/components/common/Icon'
import { getFormattedDurationText, getRelativeTime } from '~/utils/time'
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

const PodcastListItem = ({ podcastDetail, onPress, onPodcastPlay, onPodcastPause, isCurrentPodcast, paused }: Props) => {
	return (
		<Container>
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
			<RightButtonWrapper onPress={() => (isCurrentPodcast && !paused ? onPodcastPause() : onPodcastPlay(podcastDetail))}>
				<Icon name={isCurrentPodcast && !paused ? 'pause-circle-outline' : 'play-circle-outline'} size={40} />
				<DurationText>{getFormattedDurationText(podcastDetail.durationInSeconds, podcastDetail.currentPosition)}</DurationText>
			</RightButtonWrapper>
		</Container>
	)
}

export default withTheme(PodcastListItem)
