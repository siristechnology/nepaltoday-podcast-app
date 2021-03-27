import React from 'react'
import { withTheme } from 'styled-components'
import Icon from '~/components/common/Icon'
import CONSTANTS from '~/utils/CONSTANTS'
import { getFormattedDurationFromSeconds, getRelativeTime } from '~/utils/time'
import {
	Container,
	TitleRow,
	TitleWrapper,
	PodcastImage,
	Title,
	Description,
	DurationText,
	RightButtonWrapper,
	BottomRow,
	AuthorInfo,
	AuthorImage,
	AuthorText,
	SourceTimeText,
	LeftWrapper,
	RelativeTimeWrapper,
} from './podcastListItem.styles'

type Props = {
	podcastDetail: Object,
	isLastIndex: boolean,
	onPress: Function,
}

const PodcastListItem = ({ podcastDetail, isLastIndex, onPress, navigation, theme }: Props): Object => {
	return (
		<Container isLastIndex={isLastIndex}>
			<TitleRow>
				<LeftWrapper onPress={onPress}>
					<PodcastImage uri={podcastDetail.imageUrl} />
					<TitleWrapper>
						<Title>{podcastDetail.title}</Title>
						<Description>{podcastDetail.description.slice(0, 100) + '..'}</Description>
						<RelativeTimeWrapper>
							<Icon name="clock-outline" size={12} />
							<SourceTimeText>{getRelativeTime(podcastDetail.createdDate)}</SourceTimeText>
						</RelativeTimeWrapper>
					</TitleWrapper>
				</LeftWrapper>
				<RightButtonWrapper
					onPress={() =>
						{
							console.log('printing podcastDetail', podcastDetail);
							
							navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
							[CONSTANTS.PARAMS.PLAYER]: {
								[CONSTANTS.KEYS.PLAYLIST]: [podcastDetail],
							},
						})}
					}
				>
					<Icon name="play-circle-outline" size={40} />
				</RightButtonWrapper>
			</TitleRow>
			<BottomRow>
				<AuthorInfo>
					<AuthorImage uri={podcastDetail.program.imageUrl} />
					<AuthorText>{podcastDetail.program.title}</AuthorText>
				</AuthorInfo>
				<Icon name="circle" size={6} color={theme.colors.subTextColor} />
				<DurationText>{getFormattedDurationFromSeconds(podcastDetail.durationInSeconds)}</DurationText>
			</BottomRow>
		</Container>
	)
}

export default withTheme(PodcastListItem)
