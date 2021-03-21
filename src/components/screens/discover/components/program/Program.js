import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'

import ProgramCategoriesSeeAllListItem from '~/components/common/PodcastItemLIst'

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions'
import CONSTANTS from '~/utils/CONSTANTS'
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

const ProgramCategoriesSeeAllList = styled(FlatList)`
	width: 100%;
	height: 100%;
`

class ProgramCategoriesSeeAll extends Component {
	state = {
		podcasts: [],
		program: {},
	}

	componentDidMount() {
		const { navigation } = this.props
		const { program } = navigation.state.params

		CategoriesService.getProgramPodcast(program)
			.then((res) => {
				setHeaderPlayButtonPress(res.podcast, navigation)
				this.setState({
					podcasts: res.podcast,
					program: {
						title: res.podcast[0].program,
						imageURL: res.podcast[0].thumbnailImageURL,
						publisher: res.podcast[0].author.name,
						category: res.podcast[0].category,						
					},
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	onSubscribe() {}

	render() {
		const { navigation } = this.props

		console.log('printing this.state.program', this.state.program)

		return (
			<Wrapper>
				<ProgramCategoriesSeeAllList
					keyExtractor={(podcast) => `${podcast.id}`}
					showsVerticalScrollIndicator={false}
					data={this.state.podcasts}
					ListHeaderComponent={<ProgramInfo program={this.state.program} onSubscribe={this.onSubscribe} />}
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
						/>
					)}
				/>
			</Wrapper>
		)
	}
}

export default ProgramCategoriesSeeAll
