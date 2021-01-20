/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
AppRegistry.registerComponent(appName, () => App);
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
                // TrackPlayer.skipToNext()
            })

            TrackPlayer.addEventListener('remote-previous', () => {
                // TrackPlayer.skipToPrevious()
            })

            TrackPlayer.addEventListener('remote-duck', () => {
                TrackPlayer.pause()
            })
        },
)
