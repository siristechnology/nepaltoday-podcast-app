import React from 'react'
import { StatusBar, View } from 'react-native'
import styled from 'styled-components'

import PodcastTextContent from './PodcastTextContent'
import BackgroundImage from './BackgroundImage'
import ProgressSlider from './ProgressSlider'
import PlayerControls from './PlayerControls'
import PodcastImage from './PodcastImage'

const Wrapper = styled(View)`
	width: 100%;
	height: 100%;
	flex: 1;
	justify-content: space-between;
`

const UpperSection = styled(View)`
	padding-top: ${({ theme }) => theme.metrics.getHeightFromDP('16%')}px;
`
const PlayerComponent = ({ seekProgressTimer, currentPodcast, playPrevious, playNext, paused, pause, play, jumpForward, jumpBackward }) => (
	<Wrapper>
		<StatusBar backgroundColor="#111" barStyle="light-content" animated />
		<BackgroundImage imageURL={currentPodcast.imageUrl} />
		<UpperSection>
			<PodcastImage thumbnailImageURL={currentPodcast.imageUrl} imageURL={currentPodcast.imageUrl} />
			<PodcastTextContent author={currentPodcast.program.title} title={currentPodcast.title} />
			<ProgressSlider seekProgressTimer={seekProgressTimer} />
			<PlayerControls
				playPrevious={playPrevious}
				playNext={playNext}
				paused={paused}
				pause={pause}
				play={play}
				jumpForward={jumpForward}
				jumpBackward={jumpBackward}
			/>
		</UpperSection>
	</Wrapper>
)

export default PlayerComponent
