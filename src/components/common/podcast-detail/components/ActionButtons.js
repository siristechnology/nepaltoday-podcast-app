import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

import DefaultButton from '~/components/common/DefaultButton'
import Loading from '~/components/common/Loading'
import Icon from '~/components/common/Icon'
import appStyles from '~/styles'

const Wrapper = styled(View)`
	width: 100%;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: ${({ theme }) => theme.metrics.largeSize}px;
	margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`

const DownloadButton = styled(TouchableOpacity)`
	width: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
	height: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
	background-color: ${({ theme }) => theme.colors.white};
`

const ButtonsSeparator = styled(View)`
	width: ${({ theme }) => theme.metrics.mediumSize}px;
`

type Props = {
	onPressDownloadButton: Function,
	onPressAddToPlaylist: Function,
	isDownloadingPodcast: boolean,
	isPodcastDownloaded: boolean,
	onPressPlay: Function,
}

const renderProperIcon = (isDownloadingPodcast, isPodcastDownloaded): Object => {
	if (isDownloadingPodcast) {
		return <Loading size="small" />
	}

	if (isPodcastDownloaded) {
		return <Icon color={appStyles.colors.primaryColor} name="cloud-check" size={24} />
	}

	return <Icon color={appStyles.colors.subTextWhite} name="cloud-download-outline" size={25} />
}

const ActionButtons = ({ onPressDownloadButton, isDownloadingPodcast, isPodcastDownloaded, onPressPlay }: Props): Object => (
	<Wrapper>
		<DefaultButton onPress={onPressPlay} size="large" text="PLAY" />
		<ButtonsSeparator />
		<DownloadButton
			disabled={isDownloadingPodcast}
			onPress={onPressDownloadButton}
			style={{
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.23,
				shadowRadius: 2.62,
				elevation: 4,
			}}
		>
			{renderProperIcon(isDownloadingPodcast, isPodcastDownloaded)}
		</DownloadButton>
	</Wrapper>
)

export default ActionButtons
