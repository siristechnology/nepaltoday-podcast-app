import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTrackPlayerProgress } from 'react-native-track-player'
import styled from 'styled-components'
import appStyles from '~/styles'

const Wrapper = styled(View)`
	background-color: ${({ theme }) => theme.colors.darkText};
`

const BufferredTimeLine = styled(View)`
	width: ${({ width }) => width};
	height: 2px;
	background-color: ${({ theme }) => theme.colors.primaryColorAlpha};
	position: absolute;
`

const CurrentTimeLine = styled(View)`
	width: ${({ width }) => width};
	height: 2px;
	background-color: ${({ theme }) => theme.colors.primaryColor};
`

const ProgressTimeLine = ({ seekProgressTimer }) => {
	const { position, bufferedPosition, duration } = useTrackPlayerProgress(1000, null)

	useEffect(() => {
		seekProgressTimer(position)
	}, [seekProgressTimer, position])

	const currentTimeLineWidth = getCurrentTimeLineWidth(duration, position)
	const bufferedTimeLineWidth = getCurrentTimeLineWidth(duration, bufferedPosition)

	return (
		<Wrapper>
			<BufferredTimeLine width={bufferedTimeLineWidth} />
			<CurrentTimeLine width={currentTimeLineWidth} />
		</Wrapper>
	)
}

const getCurrentTimeLineWidth = (durationInSeconds: number, currentTimeInSeconds: number): number => {
	const screenWidth = appStyles.metrics.width

	if (!durationInSeconds || !currentTimeInSeconds) return 0

	const currentTimeLineWidth = (currentTimeInSeconds * screenWidth) / durationInSeconds

	return currentTimeLineWidth
}

export default ProgressTimeLine
