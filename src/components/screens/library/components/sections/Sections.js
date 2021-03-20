import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import SectionItem from './SectionItem';

const ContentWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const getSectionsConfig = (
  LOCAL_STACK_ROUTES,
  navigation,
) => {
  const sections = [
		{
			onPress: () =>
				navigation.navigate(LOCAL_STACK_ROUTES.PODCASTS_DOWNLOADED, {
					[CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM]: (playlist, navigation) => setHeaderPlayButtonPress(playlist, navigation),
				}),
			iconName: 'cloud-download-outline',
			title: 'Downloads',
		},
		{
			onPress: () =>
				navigation.navigate(LOCAL_STACK_ROUTES.RECENTLY_PLAYED, {
					[CONSTANTS.PARAMS.HEADER_PLAY_FUNCTION_PARAM]: (playlist, navigation) => setHeaderPlayButtonPress(playlist, navigation),
				}),
			iconName: 'clock-outline',
			title: 'Recently Played',
		},
  ]

  return sections;
};

const Sections = ({ LOCAL_STACK_ROUTES, navigation }) => {
  const sections = getSectionsConfig(LOCAL_STACK_ROUTES, navigation);

  return (
    <ContentWrapper>
      {sections.map(option => (
        <SectionItem
          onPressItem={option.onPress}
          iconName={option.iconName}
          title={option.title}
          key={option.title}
        />
      ))}
    </ContentWrapper>
  );
};

export default Sections;
