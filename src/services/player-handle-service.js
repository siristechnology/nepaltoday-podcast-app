import TrackPlayer from 'react-native-track-player'
import store from '../store'
import { Creators as PlayerCreators } from '~/store/ducks/player'

const registerPlaybackService = () => {
	TrackPlayer.registerPlaybackService(
		() =>
			async function () {
				TrackPlayer.addEventListener('remote-play', () => {
					store.dispatch(PlayerCreators.play())
				})
				TrackPlayer.addEventListener('remote-pause', () => {
					store.dispatch(PlayerCreators.pause())
				})
				TrackPlayer.addEventListener('remote-stop', () => {
					store.dispatch(PlayerCreators.stop())
				})
				TrackPlayer.addEventListener('remote-next', () => {
					store.dispatch(PlayerCreators.playNext())
				})
				TrackPlayer.addEventListener('remote-duck', () => {
					store.dispatch(PlayerCreators.pause())
				})
				TrackPlayer.addEventListener('remote-jump-forward', () => {
					store.dispatch(PlayerCreators.jumpForward())
				})
				TrackPlayer.addEventListener('remote-jump-backward', () => {
					store.dispatch(PlayerCreators.jumpBackward())
				})
			},
	)

	store.dispatch(PlayerCreators.setupPlayer())
}

registerPlaybackService()
