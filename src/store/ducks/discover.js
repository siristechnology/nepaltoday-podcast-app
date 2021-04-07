export const Types = {
	GET_DISCOVER_REQUEST: 'subject/GET_DISCOVER_REQUEST',
	GET_DISCOVER_SUCCESS: 'subject/GET_DISCOVER_SUCCESS',
	GET_DISOVER_ERROR: 'subject/GET_DISCOVER_ERROR',
	SEARCH_PODCASTS_REQUEST: 'subject/SEARCH_PODCASTS_REQUEST',
	SEARCH_PODCASTS_SUCCESS: 'subject/SEARCH_PODCASTS_SUCCESS',
	SEARCH_PODCASTS_FAILURE: 'subject/SEARCH_PODCASTS_FAILURE',
}

const INITIAL_STATE = {
	loading: true,
	error: false,
	loadingSearchPodcasts: false,
	data: null,
	podcasts: [],
}

export const Creators = {
	getDiscover: () => ({
		type: Types.GET_DISCOVER_REQUEST,
	}),

	getDiscoverSuccess: (data) => ({
		type: Types.GET_DISCOVER_SUCCESS,
		payload: { data },
	}),

	getDiscoverFailure: () => ({
		type: Types.GET_DISCOVER_ERROR,
	}),

	searchPodcasts: (searchTerm) => ({
		type: Types.SEARCH_PODCASTS_REQUEST,
		payload: { searchTerm },
	}),

	searchPodcastsSuccess: (data) => ({
		type: Types.SEARCH_PODCASTS_SUCCESS,
		payload: { data },
	}),

	searchPodcastsFailure: () => ({
		type: Types.SEARCH_PODCASTS_FAILURE,
	}),
}

const subject = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case Types.GET_DISCOVER_REQUEST:
			return {
				...INITIAL_STATE,
			}

		case Types.GET_DISCOVER_SUCCESS:
			return {
				...state,
				data: payload.data,
				loading: false,
			}

		case Types.GET_DISCOVER_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			}

		case Types.SEARCH_PODCASTS_REQUEST:
			return {
				...state,
				podcasts: [],
				loadingSearchPodcasts: true,
				error: false,
			}

		case Types.SEARCH_PODCASTS_SUCCESS:
			return {
				...state,
				loadingSearchPodcasts: false,
				error: false,
				podcasts: payload.data,
			}

		case Types.SEARCH_PODCASTS_FAILURE:
			return {
				...state,
				loadingSearchPodcasts: false,
				error: true,
			}

		default:
			return state
	}
}

export default subject
