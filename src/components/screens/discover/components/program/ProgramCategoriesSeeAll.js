// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import ProgramCategoriesSeeAllListItem from '~/components/common/PodcastListItem';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';
import CategoriesService from './programCategories.services';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-right: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ProgramCategoriesSeeAllList = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

class ProgramCategoriesSeeAll extends Component {

    state = {
        podcasts: []
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { programId } = navigation.state.params;
        CategoriesService.getProgramPodcast(programId).then(res => {
            setHeaderPlayButtonPress(res.podcast, navigation);
            this.setState({podcasts: res.podcast})
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        const { navigation } = this.props;
        return (
			<Wrapper>
				<ProgramCategoriesSeeAllList
					keyExtractor={(podcast) => `${podcast._id}`}
					showsVerticalScrollIndicator={false}
					data={this.state.podcasts}
					renderItem={({ item, index }) => (
						<ProgramCategoriesSeeAllListItem
							onPressItem={() =>
								navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
									[CONSTANTS.KEYS.PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
									[CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
								})
							}
							shouldShowDownloadStatus={false}
							roundedImage={false}
							podcast={item}
							index={index + 1}
							navigation={navigation}
						/>
					)}
				/>
			</Wrapper>
		)
    }
}

export default ProgramCategoriesSeeAll;
