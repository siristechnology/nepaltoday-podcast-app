// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';
import CONSTANTS from '~/utils/CONSTANTS';

import ProgramCategoriesListItem from './ProgramCategoriesListItem';

const Wrapper = styled(View)`
  width: 100%;
  flex: 1;
  margin-bottom: 10px;
`;

const ProgramCategoriesList = styled(FlatList)`
  width: 100%;
  flex: 1;
  margin-top: 5px;
`;

const ProgramCategoriesDiscover = ({ navigation, data }) => {

    const onProgramPress = (program) => {
        const { params } = navigation.state;
        navigation.navigate(params.LOCAL_STACK_ROUTES.PROGRAM_CATEGORIES_SEE_ALL,{program});
    }

    return (
        <Wrapper>
            <ProgramCategoriesList
                keyExtractor={podcast => `${podcast.programName}`}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data.slice(0, 9)}
                renderItem={({ item, index }) => (
                    <ProgramCategoriesListItem
                        sourceImage={item.profileImageURL}
                        sourceName={item.sourceName}
                        podcastImage={item.imageURL}
                        isLastIndex={index === data.length - 1}
                        navigation={navigation}
                        subject={item.category}
                        programName={item.programName}
                        onPressItem={onProgramPress}
                    />
                )}
            />
        </Wrapper>
    )
};

export default ProgramCategoriesDiscover;
