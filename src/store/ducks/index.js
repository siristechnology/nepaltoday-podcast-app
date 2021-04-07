import { combineReducers } from 'redux'

import localPodcastsManager from './localPodcastsManager'
import playlist from './playlist'
import subject from './subject'
import player from './player'
import discover from './discover'

export default combineReducers({
	localPodcastsManager,
	playlist,
	subject,
	player,
	discover,
})
