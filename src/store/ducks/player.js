export const Types = {
	UPDATE_PODCAST_URI: 'player/UPDATE_PODCAST_URI',
	SEEK_PROGRESS_TIMER_REQUEST: 'player/SEEK_PROGRESS_TIMER_REQUEST',
	SEEK_PROGRESS_TIMER_SUCCESS: 'player/SEEK_PROGRESS_TIMER_SUCCESS',
	PLAY_PREVIOUS_REQUEST: 'player/PLAY_PREVIOUS_REQUEST',
	PLAY_PREVIOUS_SUCCESS: 'player/PLAY_PREVIOUS_SUCCESS',
	SET_PODCAST_REQUEST: 'player/SET_PODCAST_REQUEST',
	SET_PODCAST_SUCCESS: 'player/SET_PODCAST_SUCCESS',
	PLAY_NEXT_REQUEST: 'player/PLAY_NEXT_REQUEST',
	PLAY_NEXT_SUCCESS: 'player/PLAY_NEXT_SUCCESS',
	REMOVE_FROM_PLAYLIST: 'player/REMOVE_FROM_PLAYLIST',
	SET_CURRENT_TIME: 'player/SET_CURRENT_TIME',
	RESTART_PLAYER: 'player/RESTART_PLAYER',
	DISABLE_REPETIION: 'player/DISABLE_REPETIION',
	SETUP_PLAYER: 'player/SETUP_PLAYER',
	SET_PODCASTS_RECENTLY_PLAYED: 'player/SET_PODCASTS_RECENTLY_PLAYED',
	PLAY: 'player/PLAY',
	PAUSE: 'player/PAUSE',
	STOP: 'player/STOP',
	JUMP_FORWARD: 'player/JUMP_FORWARD',
	JUMP_BACKWARD: 'player/JUMP_BACKWARD',
}

const INITIAL_STATE = {
	isCurrentPodcastDownloaded: false,
	shouldSeekProgressSlider: false,
	originalPlaylistIndex: 0,
	currentPodcast: null,
	oldPodcast: null,
	originalPlaylist: [],
	currentTime: '00:00',
	backupPlaylist: [],
	playlistIndex: 0,
	playlist: [],
	seekValue: 0,
	paused: true,
	stopPlayer: false,
}

export const Creators = {
	updatePodcastURI: (uri) => ({
		type: Types.UPDATE_PODCAST_URI,
		payload: { uri },
	}),

	seekProgressTimer: (seekValue) => ({
		type: Types.SEEK_PROGRESS_TIMER_REQUEST,
		payload: { seekValue },
	}),

	seekProgressTimerSuccess: (seekValue) => ({
		type: Types.SEEK_PROGRESS_TIMER_SUCCESS,
		payload: { seekValue },
	}),

	playPrevious: () => ({
		type: Types.PLAY_PREVIOUS_REQUEST,
	}),

	playPreviousSuccess: (payload) => ({
		type: Types.PLAY_PREVIOUS_SUCCESS,
		payload,
	}),

	setPodcast: (playlist) => ({
		type: Types.SET_PODCAST_REQUEST,
		payload: { playlist },
	}),

	setPodcastSuccess: (currentPodcast) => ({
		type: Types.SET_PODCAST_SUCCESS,
		payload: { currentPodcast },
	}),

	playNext: () => ({
		type: Types.PLAY_NEXT_REQUEST,
	}),

	playNextSuccess: (payload) => ({
		type: Types.PLAY_NEXT_SUCCESS,
		payload,
	}),

	removeFromPlaylist: (_id) => ({
		type: Types.REMOVE_FROM_PLAYLIST,
		payload: { _id },
	}),

	setCurrentTime: (currentTime) => ({
		type: Types.SET_CURRENT_TIME,
		payload: { currentTime },
	}),

	restartPlayer: (originalPlaylistIndex, currentPodcast) => ({
		type: Types.RESTART_PLAYER,
		payload: { originalPlaylistIndex, currentPodcast },
	}),

	setupPlayer: (playlist) => ({
		type: Types.SETUP_PLAYER,
		payload: { playlist },
	}),

	play: () => ({
		type: Types.PLAY,
	}),

	pause: () => ({
		type: Types.PAUSE,
	}),

	stop: () => ({
		type: Types.STOP,
	}),

	jumpForward: () => ({
		type: Types.JUMP_FORWARD,
	}),

	jumpBackward: () => ({
		type: Types.JUMP_BACKWARD,
	}),
}

const parseCurrentPodcastTime = (rawTime) => {
	const currentTime = Math.ceil(rawTime)

	const currentTimeInMinutes = Math.floor(currentTime / 60)
	const currentTimeInSeconds = currentTime % 60

	let minutes = '00'
	let seconds = '00'

	if (currentTimeInMinutes > 9) {
		minutes = currentTimeInMinutes
	}

	if (currentTimeInMinutes >= 1 && currentTimeInMinutes <= 9) {
		minutes = `0${currentTimeInMinutes}`
	}

	if (currentTimeInSeconds > 9 && currentTimeInSeconds <= 59) {
		seconds = currentTimeInSeconds
	}

	if (currentTimeInSeconds >= 1 && currentTimeInSeconds <= 9) {
		seconds = `0${currentTimeInSeconds}`
	}

	if (currentTimeInSeconds === 60) {
		seconds = '00'
	}

	return `${minutes}:${seconds}`
}

const player = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case Types.UPDATE_PODCAST_URI:
			return {
				...state,
				originalPlaylist: Object.assign([...state.originalPlaylist], {
					[state.originalPlaylistIndex]: {
						...state.currentPodcast,
						uri: payload.uri,
					},
				}),
				playlist: Object.assign([...state.playlist], {
					[state.playlistIndex]: {
						...state.currentPodcast,
						uri: payload.uri,
					},
				}),
			}

		case Types.SEEK_PROGRESS_TIMER_REQUEST:
			return {
				...state,
				shouldSeekProgressSlider: true,
				seekValue: payload.seekValue,
				currentPodcast: {
					...state.currentPodcast,
					currentPosition: payload.seekValue,
				},
			}

		case Types.SEEK_PROGRESS_TIMER_SUCCESS:
			return {
				...state,
				currentTime: parseCurrentPodcastTime(payload.seekValue),
				shouldSeekProgressSlider: false,
			}

		case Types.PLAY_PREVIOUS_REQUEST:
			return {
				...state,
				paused: true,
			}

		case Types.PLAY_PREVIOUS_SUCCESS:
			return {
				...state,
				...payload,
				currentTime: '00:00',
				currentPodcast: {
					...state.currentPodcast,
					uri: null,
				},
			}

		case Types.SET_PODCAST_SUCCESS:
			return {
				...state,
				currentPodcast: payload.currentPodcast,
				paused: false,
			}

		case Types.PLAY_NEXT_REQUEST:
			return {
				...state,
				currentTime: '00:00',
				paused: true,
			}

		case Types.PLAY_NEXT_SUCCESS:
			return {
				...state,
				...payload,
			}

		case Types.REMOVE_FROM_PLAYLIST:
			return {
				...state,
				playlist: state.playlist.filter((podcast) => {
					const isRemovingCurrentPodcast = podcast._id === state.currentPodcast._id
					const isLookingToOtherPodcast = podcast._id !== payload._id

					return isLookingToOtherPodcast
				}),
			}

		case Types.SET_CURRENT_TIME:
			return {
				...state,
				currentTime: parseCurrentPodcastTime(payload.currentTime),
			}

		case Types.RESTART_PLAYER:
			return {
				...state,
				originalPlaylistIndex: payload.originalPlaylistIndex,
				currentPodcast: payload.currentPodcast,
				playlist: state.backupPlaylist,
				stopPlayer: true,
			}

		case Types.SETUP_PLAYER:
			return {
				...INITIAL_STATE,
				originalPlaylist: payload.playlist,
				backupPlaylist: payload.playlist,
				playlist: payload.playlist,
			}

		case Types.SET_PODCAST_REQUEST:
			return {
				...INITIAL_STATE,
				oldPodcast: state.currentPodcast,
				originalPlaylist: payload.playlist,
				backupPlaylist: payload.playlist,
				playlist: payload.playlist,
			}

		case Types.PLAY:
			return {
				...state,
				stopPlayer: false,
				paused: false,
			}

		case Types.PAUSE:
			return {
				...state,
				stopPlayer: false,
				paused: true,
			}

		case Types.STOP:
			return {
				...state,
				stopPlayer: true,
				paused: true,
			}

		default:
			return state
	}
}

export default player
