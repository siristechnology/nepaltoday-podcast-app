// @flow

import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Creators as HomeCreators } from '~/store/ducks/discover'

import HomeComponent from './components/HomeComponent'
import CONSTANTS from '~/utils/CONSTANTS'

type HomeStoreData = {
	loading: boolean,
	error: boolean,
	data: Object,
}

type Props = {
	LOCAL_STACK_ROUTES: Object,
	home: HomeStoreData,
	navigation: Object,
	getDiscover: Function,
}

class HomeContainer extends Component<Props, {}> {
	componentDidMount() {
		const { LOCAL_STACK_ROUTES, getDiscover, navigation } = this.props

		getDiscover()

		navigation.setParams({
			LOCAL_STACK_ROUTES,
		})
	}

	render() {
		const { navigation, getDiscover, home } = this.props
		const { loading, error, data } = home

		const onTypeAuthorName = (authorName: string): void => {
			this.setState({
				authorName,
			})
		}

		const onSearchForAuthor = (): void => {
			const { navigation, LOCAL_STACK_ROUTES } = this.props
			const { authorName } = this.state

			if (authorName.length) {
				navigation.navigate(LOCAL_STACK_ROUTES.SEARCH_AUTHORS_RESULT, {
					[CONSTANTS.PARAMS.SEARCH_AUTHOR_BY_NAME]: authorName,
				})
			}
		}

		const onToggleDarkLayer = (isTextInputFocused: boolean) => {
			this.setState({
				isTextInputFocused,
			})
		}

		return (
			<HomeComponent
				onTypeAuthorName={onTypeAuthorName}
				onSearchForAuthor={onSearchForAuthor}
				onToggleDarkLayer={onToggleDarkLayer}
				navigation={navigation}
				getHome={getDiscover}
				loading={loading}
				error={error}
				data={data}
			/>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(HomeCreators, dispatch)

const mapStateToProps = (state) => ({
	home: state.discover,
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
