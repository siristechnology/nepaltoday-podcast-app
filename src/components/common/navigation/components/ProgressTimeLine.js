import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTrackPlayerProgress } from 'react-native-track-player'
import styled from 'styled-components'
import appStyles from '~/styles'

const TotalDurationLine = styled(View)`
	width: 100%;
	height: 2px;
	background-color: ${({ theme }) => theme.colors.subText};
	position: absolute;
`

const CurrentTimeLine = styled(View)`
	width: ${({ width }) => width};
	height: 2px;
	background-color: ${({ theme }) => theme.colors.subTextWhite};
`

const ProgressTimeLine = ({ seekProgressTimer }) => {
	const { position, duration } = useTrackPlayerProgress(1000, null)

	useEffect(() => {
		seekProgressTimer(position)
	}, [seekProgressTimer, position])

	const currentTimeLineWidth = getCurrentTimeLineWidth(duration, position)

	return (
		<View>
			<TotalDurationLine />
			<CurrentTimeLine width={currentTimeLineWidth} />
		</View>
	)
}

const getCurrentTimeLineWidth = (durationInSeconds: number, currentTimeInSeconds: number): number => {
	const screenWidth = appStyles.metrics.width

	if (!durationInSeconds || !currentTimeInSeconds) return 0

	const currentTimeLineWidth = (currentTimeInSeconds * screenWidth) / durationInSeconds

	return currentTimeLineWidth
}

export default ProgressTimeLine
