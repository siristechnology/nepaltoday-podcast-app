import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'

import PlaylistList from '~/components/common/playlists-list/PlaylistsListContainer'

import ActionButtons from './ActionButtons'
import BottomContent from './BottomContent'
import PodcastInfo from './PodcastInfo'

import CONSTANTS from '~/utils/CONSTANTS'

const Wrapper = styled(ScrollView)`
	width: 100%;
	height: 100%;
	flex: 1;
	padding: ${({ theme }) => theme.metrics.mediumSize}px;
	background-color: ${({ theme }) => theme.colors.backgroundColor};
`

type AuthorProps = {
	smallImageURL: string,
	name: string,
	id: string,
}

type PodcastProps = {
	author: AuthorProps,
	description: string,
	uploadedAt: string,
	imageURL: string,
	subject: string,
	title: string,
	stars: number,
	url: string,
	id: string,
}

type Props = {
	onToggleAddPlaylistModal: Function,
	onNavigateAuthorDetail: Function,
	shouldShowAuthorSection: boolean,
	isAddPlaylistModalOpen: boolean,
	onPressDownloadButton: Function,
	isDownloadingPodcast: boolean,
	isPodcastDownloaded: boolean,
	onPressPlay: Function,
	navigation: Object,
	podcast: Props,
}

const PodcastDetailComponent = ({
	onToggleAddPlaylistModal,
	shouldShowAuthorSection,
	onNavigateAuthorDetail,
	isAddPlaylistModalOpen,
	onPressDownloadButton,
	isDownloadingPodcast,
	isPodcastDownloaded,
	onPressPlay,
	navigation,
	podcast,
}: Props): Object => (
	<Wrapper showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
		<PodcastInfo imageUrl={podcast.imageUrl} subject={podcast.category} title={podcast.title} stars={4} />
		<ActionButtons
			onPressAddToPlaylist={onToggleAddPlaylistModal}
			isDownloadingPodcast={isDownloadingPodcast}
			onPressDownloadButton={onPressDownloadButton}
			isPodcastDownloaded={isPodcastDownloaded}
			onPressPlay={onPressPlay}
		/>
		<BottomContent
			shouldShowAuthorSection={shouldShowAuthorSection}
			onPressDetail={() => {
				navigation.navigate(CONSTANTS.ROUTES.AUTHOR_DETAIL, {
					[CONSTANTS.PARAMS.AUTHOR_DETAIL]: {
						program: podcast.program,
					},
				})
			}}
			description={podcast.description}
			author={podcast.program}
		/>
		{isAddPlaylistModalOpen && <PlaylistList onToggleModal={onToggleAddPlaylistModal} podcast={podcast} />}
	</Wrapper>
)

export default PodcastDetailComponent
