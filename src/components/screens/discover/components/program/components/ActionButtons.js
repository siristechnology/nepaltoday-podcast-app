import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

import DefaultButton from '~/components/common/DefaultButton'

const Wrapper = styled(View)`
	width: 100%;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: ${({ theme }) => theme.metrics.largeSize}px;
	margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`

const ButtonsSeparator = styled(View)`
	width: ${({ theme }) => theme.metrics.mediumSize}px;
`

type Props = {
	onSubscribe: Function,
}

const ActionButtons = ({ onSubscribe }: Props): Object => (
	<Wrapper>
		<DefaultButton onPress={onSubscribe} size="large" text="SUBSCRIBE" />
		<ButtonsSeparator />
	</Wrapper>
)

export default ActionButtons
