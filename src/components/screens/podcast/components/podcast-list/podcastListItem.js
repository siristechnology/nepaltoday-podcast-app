import React from 'react'
import { View } from 'react-native'
import { withTheme } from 'styled-components'
import Icon from '~/components/common/Icon'
import CONSTANTS from '~/utils/CONSTANTS'
import { getFormattedDurationFromSeconds, getRelativeTime } from '~/utils/time'
import {
	Container,
	TitleRow,
	PodcastImage,
	Title,
	Description,
	DurationView,
	DurationText,
	BottomRow,
	AuthorInfo,
	AuthorImage,
	AuthorText,
	SourceTimeText,
} from './podcastListItem.styles'

type Props = {
	podcastDetail: Object,
	isLastIndex: boolean,
	onPress: Function,
}

const PodcastListItem = ({ podcastDetail, isLastIndex, onPress, navigation, theme }: Props): Object => {
	return (
		<Container isLastIndex={isLastIndex} onPress={onPress}>
			<TitleRow>
				<PodcastImage uri={podcastDetail.imageURL} />
				<View>
					<Title>{podcastDetail.title}</Title>
					<Description>{podcastDetail.description.slice(0, 100) + '..'}</Description>
					<DurationView
						onPress={() =>
							navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
								[CONSTANTS.PARAMS.PLAYER]: {
									[CONSTANTS.KEYS.PLAYLIST]: [podcastDetail],
								},
							})
						}
					>
						<Icon name="play-circle-outline" size={20} />
						<DurationText>{getFormattedDurationFromSeconds(podcastDetail.durationInSeconds)}</DurationText>
					</DurationView>
				</View>
			</TitleRow>
			<BottomRow>
				<AuthorInfo>
					<AuthorImage uri={podcastDetail.author.profileImageURL} />
					<AuthorText>{podcastDetail.author.name}</AuthorText>
				</AuthorInfo>
				<Icon name="clock-outline" size={16} color={theme.colors.subTextColor} />
				<SourceTimeText>{getRelativeTime(podcastDetail.createdDate)}</SourceTimeText>
			</BottomRow>
		</Container>
	)
}

export default withTheme(PodcastListItem)
