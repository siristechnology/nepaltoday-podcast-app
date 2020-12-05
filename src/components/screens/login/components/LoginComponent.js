// @flow

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import BottomContent from './BottomContent';
import ChangeAction from './ChangeAction';
import Input from './Input';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('70%')}px;
  justify-content: space-between;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DefaultText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Bold;
  color: ${({ color }) => color};
  text-align: center;
`;

type Props = {
  onNavigateToMainStack: Function,
  onChangeListIndex: Function,
};

const LoginComponent = ({ onNavigateToMainStack, onChangeListIndex }: Props): Object => (
	<Wrapper>
		<BottomContent onNavigateToMainStack={onNavigateToMainStack} actionSelected="Login" />
	</Wrapper>
)

export default LoginComponent;
