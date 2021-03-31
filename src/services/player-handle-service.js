import TrackPlayer from 'react-native-track-player'

TrackPlayer.registerPlaybackService(
	() =>
		async function () {
			TrackPlayer.addEventListener('remote-play', () => {
				TrackPlayer.play()
			})
			TrackPlayer.addEventListener('remote-pause', () => {
				TrackPlayer.pause()
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
