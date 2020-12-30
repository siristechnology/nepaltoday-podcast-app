import React from 'react'
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '~/utils/CONSTANTS';
import PodcastListItem from './podcastListItem';

const Wrapper = styled(View)`
  width: 100%;
  flex: 1;
  margin-top: 15px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const AllPodcastList = styled(FlatList)`
  width: 100%;
  flex: 1;
`;

type Props = {
    data: Array<Object>,
    navigation: Object,
};

const PodcastList = ({navigation, data}: Props): Object => {
    return(
    <Wrapper>
        <AllPodcastList
            keyExtractor={podcast => `${podcast._id}`}
            data={data}
            renderItem={({ item, index }) => (
                <PodcastListItem
                    onPress={() => navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                        [CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                        [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
                    })}
                    isLastIndex={index === data.length - 1}
                    navigation={navigation}
                    podcastDetail={item}
                />
            )}
        />
    </Wrapper>
)}

export default PodcastList