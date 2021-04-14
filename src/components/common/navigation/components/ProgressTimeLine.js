import React from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ProgressComponent } from 'react-native-track-player'
import styled from 'styled-components'

import { Creators as PlayerCreators } from '~/store/ducks/player'
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

const getCurrentTimeLineWidth = (durationInSeconds: number, currentTimeInSeconds: number): number => {
	const screenWidth = appStyles.metrics.width

	const currentTimeLineWidth = (currentTimeInSeconds * screenWidth) / durationInSeconds

	return currentTimeLineWidth
}

class ProgressTimeLine extends ProgressComponent {
	render() {
		const { durationInSeconds, seekProgressTimer } = this.props
		const currentTime = this.getProgress() * durationInSeconds
		seekProgressTimer(currentTime)

		const currentTimeLineWidth = getCurrentTimeLineWidth(durationInSeconds, currentTime)

		return (
			<View>
				<TotalDurationLine />
				<CurrentTimeLine width={currentTimeLineWidth} />
			</View>
		)
	}
}
const mapDispatchToProps = (dispatch) => bindActionCreators(PlayerCreators, dispatch)

const mapStateToProps = (state) => ({
	durationInSeconds: state.player.currentPodcast.durationInSeconds,
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressTimeLine)
