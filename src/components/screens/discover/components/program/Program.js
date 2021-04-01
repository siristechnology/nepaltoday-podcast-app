import React, { Component } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'

import PodcastListItem from '~/components/common/PodcastListItem'
import CONSTANTS from '~/utils/CONSTANTS'
import appStyles from '~/styles'
import ProgramInfo from './components/ProgramInfo'
import CategoriesService from './programCategories.services'

const Wrapper = styled(View)`
	width: 100%;
	height: 100%;
	flex: 1;
	padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
	padding-right: ${({ theme }) => theme.metrics.mediumSize}px;
	background-color: ${({ theme }) => theme.colors.backgroundColor};
`

class Program extends Component {
	state = {
		loading: true,
		podcasts: [],
		program: {},
	}

	componentDidMount() {
		const { navigation } = this.props
		const { programId } = navigation.state.params

		CategoriesService.getProgramPodcast(programId)
			.then((program) => {
				this.setState({
					podcasts: program.podcasts,
					program: {
						title: program.title,
						imageUrl: program.imageUrl,
						publisher: program.publisher.title,
						category: program.category,
					},
					loading: false,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	render() {
		const { navigation } = this.props

		const onPlayAll =  () => {
			navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
				[CONSTANTS.PARAMS.PLAYER]: {
				  [CONSTANTS.KEYS.PLAYLIST]: this.state.podcasts,
				},
			  });
		}

		return (
			<Wrapper>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={this.state.podcasts}
					ListHeaderComponent={<ProgramInfo program={this.state.program} onPlayAll={onPlayAll} />}
					renderItem={({ item, index }) => (
						<PodcastListItem
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
					keyExtractor={(podcast) => `${podcast._id}`}
					refreshControl={
						<RefreshControl
							progressBackgroundColor={appStyles.colors.primaryColor}
							tintColor={appStyles.colors.primaryColor}
							colors={[appStyles.colors.white]}
							refreshing={this.state.loading}
						/>
					}
				/>
			</Wrapper>
		)
	}
}

export default Program
