import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

import DefaultButton from '~/components/common/DefaultButton'

const Wrapper = styled(View)`
	width: 100%;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: ${({ theme }) => theme.metrics.smallSize}px;
	margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`

const ButtonsSeparator = styled(View)`
	width: ${({ theme }) => theme.metrics.mediumSize}px;
`

type Props = {
	onPlayAll: Function,
}

const ActionButtons = ({ onPlayAll }: Props): Object => (
	<Wrapper>
		<DefaultButton onPress={onPlayAll} size="large" text="Play All" />
	</Wrapper>
)

export default ActionButtons
