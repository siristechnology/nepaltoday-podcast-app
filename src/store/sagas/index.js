import { all, takeLatest } from 'redux-saga/effects'

import { Types as LocalPodcastsManagerCreators } from '../ducks/localPodcastsManager'
import { Types as PlaylistTypes } from '../ducks/playlist'
import { Types as SubjectTypes } from '../ducks/subject'
import { Types as PlayerTypes } from '../ducks/player'
import { Types as DiscoverTypes } from '../ducks/discover'

import {
	clearAllLocalPodcastsReferences,
	setPodcastsDownloadedList,
	downloadPodcastToLocalStorage,
	removePodcastFromLocalStorage,
	loadPodcastsRecentlyPlayed,
	addPodcastToRecentlyPlayedList,
} from './localPodcastsManager'
import { setPodcast, playNext, playPrevious, setupPlayer, repeatCurrentPodcast, play, pause, stop } from './player'
import { getSubjectDetail } from './subject'
import {
	createPlaylist,
	loadPlaylists,
	addPodcast,
	removePodcast,
	getPlaylist,
	setOfflineAvailability,
	removePlaylist,
	editPlaylist,
} from './playlist'
import { getDiscover, searchPodcasts } from './discover'

export default function* rootSaga() {
	return yield all([
		takeLatest(DiscoverTypes.GET_DISCOVER_REQUEST, getDiscover),
		takeLatest(DiscoverTypes.SEARCH_PODCASTS_REQUEST, searchPodcasts),
		takeLatest(LocalPodcastsManagerCreators.SET_PODCASTS_DOWNLOADED_LIST_REQUEST, setPodcastsDownloadedList),
		takeLatest(LocalPodcastsManagerCreators.DOWNLOAD_PODCAST, downloadPodcastToLocalStorage),
		takeLatest(LocalPodcastsManagerCreators.CLEAR_LOCAL_PODCASTS_REFERENCES_REQUEST, clearAllLocalPodcastsReferences),
		takeLatest(LocalPodcastsManagerCreators.REMOVE_PODCAST, removePodcastFromLocalStorage),
		takeLatest(LocalPodcastsManagerCreators.LOAD_PODCASTS_RECENTLY_PLAYED_REQUEST, loadPodcastsRecentlyPlayed),
		takeLatest(LocalPodcastsManagerCreators.ADD_PODCAST_RECENTLY_PLAYED_REQUEST, addPodcastToRecentlyPlayedList),
		takeLatest(PlayerTypes.SET_PODCAST_REQUEST, setPodcast),
		takeLatest(PlayerTypes.REPEAT_CURRENT_PODCAST_REQUEST, repeatCurrentPodcast),
		takeLatest(PlayerTypes.PLAY, play),
		takeLatest(PlayerTypes.PAUSE, pause),
		takeLatest(PlayerTypes.STOP, stop),
		takeLatest(PlayerTypes.SETUP_PLAYER, setupPlayer),
		takeLatest(PlayerTypes.PLAY_NEXT_REQUEST, playNext),
		takeLatest(PlayerTypes.PLAY_PREVIOUS_REQUEST, playPrevious),
		takeLatest(SubjectTypes.GET_SUBJECT_DETAIL_REQUEST, getSubjectDetail),
		takeLatest(PlaylistTypes.CREATE_PLAYLIST_REQUEST, createPlaylist),
		takeLatest(PlaylistTypes.LOAD_PLAYLISTS_REQUEST, loadPlaylists),
		takeLatest(PlaylistTypes.ADD_PODCAST_REQUEST, addPodcast),
		takeLatest(PlaylistTypes.REMOVE_PODCAST_REQUEST, removePodcast),
		takeLatest(PlaylistTypes.REMOVE_PLAYLIST_REQUEST, removePlaylist),
		takeLatest(PlaylistTypes.EDIT_PLAYLIST_REQUEST, editPlaylist),
		takeLatest(PlaylistTypes.GET_PLAYLIST_REQUEST, getPlaylist),
		takeLatest(PlaylistTypes.SET_AVAILABLE_OFFLINE_REQUEST, setOfflineAvailability),
	])
}
