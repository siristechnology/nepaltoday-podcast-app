import { select, call, all, put } from 'redux-saga/effects'

import { Creators as LocalPodcastsManagerCreators } from '../ducks/localPodcastsManager'
import { Creators as PlayerCreators } from '../ducks/player'
import TrackPlayer from 'react-native-track-player'

const _findIndexInsideOriginalPlaylist = (originalPlaylist, podcastSearched) => {
	const index = originalPlaylist.findIndex((podcast) => podcast._id === podcastSearched._id)

	return index
}

function* _getPodcastFromStorage(id) {
	const { podcastsDownloaded } = yield select((state) => state.localPodcastsManager)

	const podcastStored = podcastsDownloaded.filter((podcast) => podcast._id === id)[0]

	return podcastStored
}

function* _definePodcastURI(podcast) {
	const podcastStored = yield _getPodcastFromStorage(podcast._id)

	const isPodcastStored = !!podcastStored && !!podcastStored.path && typeof podcastStored.path === 'string'

	const uri = isPodcastStored ? podcastStored.path : podcast.audioUrl

	const podcastWithURI = {
		...podcast,
		uri,
	}

	return podcastWithURI
}

function* _getSecondsPassedSincePodcastStarted() {
	const { currentTime } = yield select((state) => state.player)

	const [rawMinutes, rawSeconds] = currentTime.split(':')

	const minutes = parseInt(rawMinutes, 10)
	const seconds = parseInt(rawSeconds, 10)

	return minutes * 60 + seconds
}

function* _rewindToPreviousPodcast(newPlaylistIndex) {
	try {
		const { originalPlaylistIndex, originalPlaylist, playlist } = yield select((state) => state.player)

		let newOriginalPlaylistIndex = originalPlaylistIndex

		const previousPodcast = playlist[newPlaylistIndex]

		yield put(
			PlayerCreators.playPreviousSuccess({
				originalPlaylistIndex: newOriginalPlaylistIndex,
				playlistIndex: newPlaylistIndex,
			}),
		)
	} catch (err) {
		console.log('_rewindToPreviousPodcast')
	}
}

export function* setupPlayer() {
	try {
		registerPlaybackService()
		trackPlayerInit()
	} catch (err) {
		console.log('setupPlayer', err)
	}
}

const trackPlayerInit = async () => {
	await TrackPlayer.setupPlayer()
	await TrackPlayer.updateOptions({
		stopWithApp: true,
		alwaysPauseOnInterruption: true,
		jumpInterval: 30,
		capabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_STOP,
			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_JUMP_FORWARD,
			TrackPlayer.CAPABILITY_JUMP_BACKWARD,
		],
		compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
		notificationCapabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_STOP,
			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_JUMP_FORWARD,
			TrackPlayer.CAPABILITY_JUMP_BACKWARD,
		],
	})
}

function registerPlaybackService() {
	TrackPlayer.registerPlaybackService(
		() =>
			async function () {
				TrackPlayer.addEventListener('remote-play', () => {
					play().next()
				})
				TrackPlayer.addEventListener('remote-pause', () => {
					pause().next()
				})
				TrackPlayer.addEventListener('remote-stop', () => {
					stop().next()
				})
				TrackPlayer.addEventListener('remote-next', () => {
					playNext().next()
				})
				TrackPlayer.addEventListener('remote-duck', () => {
					pause().next()
				})
				TrackPlayer.addEventListener('remote-jump-forward', () => {
					jumpForward().next()
				})
				TrackPlayer.addEventListener('remote-jump-backward', () => {
					jumpBackward().next()
				})
			},
	)
}

export function* play() {
	TrackPlayer.play()
	console.log('play button pressed')
}

export function* pause() {
	TrackPlayer.pause()
	const { currentPodcast } = yield select((state) => state.player)

	yield put(LocalPodcastsManagerCreators.addPodcastToRecentlyPlayedList(currentPodcast))
}

export function* jumpForward() {
	TrackPlayer.getPosition().then((currentPosition) => {
		TrackPlayer.seekTo(currentPosition + 30)
	})
}

export function* jumpBackward() {
	TrackPlayer.getPosition().then((currentPosition) => {
		const nextPostion = currentPosition > 30 ? currentPosition - 30 : 0
		TrackPlayer.seekTo(nextPostion)
	})
}

export function* stop() {
	TrackPlayer.stop()
}

export function* setPodcast() {
	try {
		const { oldPodcast, playlistIndex, playlist } = yield select((state) => state.player)
		const newPodcast = playlist && playlist[playlistIndex]
		if (!newPodcast) return

		const podcastWithURI = yield _definePodcastURI(newPodcast)

		yield TrackPlayer.reset()
		yield TrackPlayer.add({
			id: newPodcast._id,
			url: newPodcast.audioUrl,
			title: newPodcast.title,
			album: newPodcast.publisher.title,
			artist: newPodcast.program.title,
			artwork: newPodcast.imageUrl,
		})

		if (newPodcast.currentPosition > 3) TrackPlayer.seekTo(newPodcast.currentPosition - 3)

		yield play()
		yield put(PlayerCreators.setPodcastSuccess(podcastWithURI))
		yield put(LocalPodcastsManagerCreators.addPodcastToRecentlyPlayedList(oldPodcast))
		yield put(LocalPodcastsManagerCreators.addPodcastToRecentlyPlayedList(newPodcast))
	} catch (err) {
		console.log('err', err)
	}
}

function* _defineNextPodcast(nextPodcast, playlistIndex) {
	const { originalPlaylistIndex, originalPlaylist } = yield select((state) => state.player)

	let originalPlaylistCurrentIndex = originalPlaylistIndex

	yield put(
		PlayerCreators.playNextSuccess({
			originalPlaylistIndex: originalPlaylistCurrentIndex,
			currentPodcast: nextPodcast,
			playlistIndex,
		}),
	)

	yield call(setPodcast)
}

function* _handleRestartPlayer(firstPodcast) {
	const { originalPlaylist } = yield select((state) => state.player)

	let firstPodcastPlaylist = firstPodcast

	const hasURIDefined = !!firstPodcastPlaylist.uri && typeof firstPodcastPlaylist.uri === 'string'

	if (!hasURIDefined) {
		firstPodcastPlaylist = yield _definePodcastURI(firstPodcastPlaylist)
	}

	const originalPlaylistIndex = _findIndexInsideOriginalPlaylist(originalPlaylist, firstPodcastPlaylist)

	yield put(PlayerCreators.restartPlayer(originalPlaylistIndex, firstPodcastPlaylist))
}

export function* playNext() {
	try {
		const { currentPodcast, backupPlaylist, playlistIndex, playlist } = yield select((state) => state.player)
		const isLastPodcastOfPlaylist = playlistIndex === playlist.length - 1
		const isPlaylistEmpty = playlist.length === 0

		if (isPlaylistEmpty) {
			TrackPlayer.pause()
			// return yield _handleRestartPlayer(backupPlaylist[0]);
		}

		if (!isLastPodcastOfPlaylist) {
			return yield _defineNextPodcast(playlist[playlistIndex + 1], playlistIndex + 1)
		}
	} catch (err) {
		console.log('playNext')
	}
}

export function* playPrevious() {
	try {
		const secondsPassedSincePodcastStarted = yield _getSecondsPassedSincePodcastStarted()

		if (secondsPassedSincePodcastStarted <= 3) {
			const { playlistIndex } = yield select((state) => state.player)

			if (playlistIndex !== 0) {
				yield _rewindToPreviousPodcast(playlistIndex - 1)
			}
		}

		if (secondsPassedSincePodcastStarted > 3) {
			yield put(PlayerCreators.playPreviousSuccess({}))
		}

		yield call(setPodcast)
	} catch (err) {
		console.log('playPrevious')
	}
}
