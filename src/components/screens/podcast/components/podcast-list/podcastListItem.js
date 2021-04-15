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
	podcast: Object,
	isLastIndex: boolean,
	onPress: Function,
}

const PodcastListItem = ({ podcast, onPress, onPodcastPlay, onPodcastPause, currentPodcast, paused }: Props) => {
	const isCurrentPodcast = podcast._id === currentPodcast?._id
	const currentPosition = !isCurrentPodcast ? podcast.currentPosition : currentPodcast.currentPosition

	return (
		<Container>
			<LeftWrapper onPress={onPress}>
				<PodcastImage uri={podcast.imageUrl} />
				<TitleWrapper>
					<RelativeTimeWrapper>
						<SourceTimeText>{getRelativeTime(podcast.createdDate)}</SourceTimeText>
					</RelativeTimeWrapper>
					<Title>{podcast.title}</Title>
					<Description>{podcast.description}</Description>
				</TitleWrapper>
			</LeftWrapper>
			<RightButtonWrapper onPress={() => (isCurrentPodcast && !paused ? onPodcastPause() : onPodcastPlay(podcast))}>
				<Icon name={isCurrentPodcast && !paused ? 'pause-circle-outline' : 'play-circle-outline'} size={40} />
				<DurationText>{getFormattedDurationText(podcast.durationInSeconds, currentPosition)}</DurationText>
			</RightButtonWrapper>
		</Container>
	)
}

export default withTheme(PodcastListItem)
