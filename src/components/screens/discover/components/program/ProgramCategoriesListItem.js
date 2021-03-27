// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import AuthorInfo from '~/components/common/AuthorInfo';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')};
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')};
  margin-left: ${({ theme }) => theme.metrics.largeSize}px;
  margin-right: ${({ theme, isLastIndex }) => (isLastIndex ? theme.metrics.largeSize : 0)}px;
  border-radius: 4px;
`;

const AuthorInfoWrapper = styled(View)`
  width: 80%;
`;

const SourceImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightDark};
`;

const ProgramTitle = styled(Text).attrs({
  numberOfLines: 3,
})`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-family: ${Platform.OS === 'android'
    ? 'CircularStd-Medium'
    : 'CircularStd-Black'};
  color: ${({ theme }) => theme.colors.white};
`;

const ProgramCategory = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

const ProgramCategoriesListItem = ({
  program,
  isLastIndex,
  onPressItem,
}) => (
  <Wrapper
    isLastIndex={isLastIndex}
    onPress={()=>onPressItem(program.id)}
  >
    <SourceImage
      uri={program.imageUrl}
    />
    <DarkLayer>
      <AuthorInfoWrapper>
        <AuthorInfo
          imageURL={program.publisher.imageUrl}
          numberOfLines={2}
          textColor="white"
          name={program.publisher.title}
        />
      </AuthorInfoWrapper>
      <View>
        <ProgramTitle>{program.title}</ProgramTitle>
        <ProgramCategory>{`#${program.category}`}</ProgramCategory>
      </View>
    </DarkLayer>
  </Wrapper>
);

export default ProgramCategoriesListItem;
