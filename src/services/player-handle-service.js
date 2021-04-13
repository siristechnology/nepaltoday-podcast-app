import store from '../store'
import { Creators as PlayerCreators } from '~/store/ducks/player'

const registerPlaybackService = () => {
	store.dispatch(PlayerCreators.setupPlayer())
}

registerPlaybackService()
