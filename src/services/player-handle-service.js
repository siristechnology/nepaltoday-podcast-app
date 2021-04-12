import TrackPlayer from 'react-native-track-player'
import { select, delay, call, all, put } from 'redux-saga/effects'
import { Creators as PlayerCreators } from '../store/ducks/player'

TrackPlayer.registerPlaybackService(
	() =>
		async function () {
			TrackPlayer.addEventListener('remote-play', function* () {
				// TrackPlayer.play()
				console.log('play from remote notification')
				yield put(PlayerCreators.play())
			})
			TrackPlayer.addEventListener('remote-pause', function* () {
				// TrackPlayer.pause()
				yield put(PlayerCreators.pause())
			})
			TrackPlayer.addEventListener('remote-stop', () => {
				TrackPlayer.stop()
			})
			TrackPlayer.addEventListener('remote-next', () => {
				TrackPlayer.skipToNext()
			})
			TrackPlayer.addEventListener('remote-previous', () => {
				TrackPlayer.skipToPrevious()
			})
			TrackPlayer.addEventListener('remote-duck', () => {
				TrackPlayer.pause()
			})
			TrackPlayer.addEventListener('remote-jump-forward', async () => {
				const currentPosition = await TrackPlayer.getPosition()
				TrackPlayer.seekTo(currentPosition + 30)
			})
			TrackPlayer.addEventListener('remote-jump-backward', async () => {
				const currentPosition = await TrackPlayer.getPosition()
				const nextPostion = currentPosition > 30 ? currentPosition - 30 : 0
				TrackPlayer.seekTo(nextPostion)
			})
		},
)
