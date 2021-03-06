import React from 'react'
import { View, Text } from 'react-native'
import Slider from '@react-native-community/slider'
import styled from 'styled-components'
import { connect } from 'react-redux'
import TrackPlayer, { ProgressComponent } from 'react-native-track-player'

import appStyles from '~/styles'

const Wrapper = styled(View)`
	width: 100%;
	justify-content: center;
	padding-horizontal: 20px;
`

const TimerWrapper = styled(View)`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
`

const TimerText = styled(Text)`
	color: ${({ theme }) => theme.colors.white};
	font-family: CircularStd-Medium;
	font-size: ${({ theme }) => theme.metrics.largeSize}px;
`

type PlayerProps = {
	shouldSeekProgressSlider: boolean,
	currentTimeInSeconds: number,
	currentPodcast: Object,
	currentTime: string,
}

type Props = {
	seekProgressTimer: Function,
	player: PlayerProps,
}

type State = {
	isSliding: boolean,
	slideValue: number,
}

class ProgressSlider extends ProgressComponent<Props, State> {
	state = {
		isSliding: false,
		slideValue: 0,
	}

	UNSAFE_componentWillReceiveProps(nextProps: Props) {
		const { player } = nextProps
		const { shouldSeekProgressSlider, currentTime } = player

		const { isSliding } = this.state

		if (isSliding || shouldSeekProgressSlider) {
			return
		}

		const rawMinutes = currentTime.split(':')[0]
		const rawSeconds = currentTime.split(':')[1]

		const minutes = parseInt(rawMinutes, 10)
		const seconds = parseInt(rawSeconds, 10)

		const currentTimeInSeconds = minutes * 60 + seconds

		this.setState({
			slideValue: currentTimeInSeconds,
		})
	}

	onSlidingComplete = (slideValue: number): void => {
		const { seekProgressTimer } = this.props

		this.setState({ isSliding: false, slideValue }, () => seekProgressTimer(slideValue))
	}

	onValueChange = (slideValue: number): void => {
		TrackPlayer.seekTo(slideValue)
		this.setState({
			isSliding: true,
			slideValue,
		})
	}

	render() {
		const { player } = this.props

		const { currentPodcast } = player
		const { durationInSeconds } = currentPodcast

		const slideValue = this.getProgress() * durationInSeconds

		const currentTime = new Date(slideValue * 1000).toISOString().substr(11, 8).replace(/^00:/s, '')
		const duration = new Date(durationInSeconds * 1000).toISOString().substr(11, 8).replace(/^00:/s, '')

		return (
			<Wrapper>
				<Slider
					onSlidingComplete={(value) => this.onSlidingComplete(value)}
					minimumTrackTintColor={appStyles.colors.primaryColor}
					maximumTrackTintColor={appStyles.colors.subTextWhite}
					onValueChange={(value) => this.onValueChange(value)}
					thumbTintColor={appStyles.colors.primaryColor}
					maximumValue={durationInSeconds}
					value={slideValue}
					minimumValue={0}
					step={1}
				/>
				<TimerWrapper>
					<TimerText>{currentTime}</TimerText>
					<TimerText>{duration}</TimerText>
				</TimerWrapper>
			</Wrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	player: state.player,
})

export default connect(mapStateToProps)(ProgressSlider)
