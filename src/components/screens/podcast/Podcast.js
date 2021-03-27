import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Creators as PodcastCreators } from '~/store/ducks/podcast'

import HomeComponent from './components/HomeComponent'

type HomeStoreData = {
	loading: boolean,
	error: boolean,
	data: Object,
}

type Props = {
	LOCAL_STACK_ROUTES: Object,
	home: HomeStoreData,
	navigation: Object,
	getHome: Function,
}

class HomeContainer extends Component<Props, {}> {
	componentDidMount() {
		const { LOCAL_STACK_ROUTES, getHome, navigation } = this.props

		getHome()

		navigation.setParams({
			LOCAL_STACK_ROUTES,
		})
	}

	render() {
		const { navigation, getHome, podcast } = this.props
		const { loading, error, data } = podcast

		return <HomeComponent navigation={navigation} getHome={getHome} loading={loading} error={error} data={data} />
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(PodcastCreators, dispatch)

const mapStateToProps = (state) => ({
	podcast: state.podcast,
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
