import React, { Component } from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Creators as DiscoverCreators } from '~/store/ducks/discover'

import AuthorDetailComponent from './components/AuthorDetailComponent'
import CONSTANTS from '~/utils/CONSTANTS'

type Props = {
	getAuthorById: Function,
	navigation: Object,
	loading: boolean,
	error: boolean,
	author: Object,
}

class AuthorDetailContainer extends Component<Props, {}> {
	componentDidMount() {
		const { getAuthorByProgram, navigation } = this.props
		const { params } = navigation.state
		const { program } = params[CONSTANTS.PARAMS.AUTHOR_DETAIL]

		getAuthorByProgram(program)
	}

	render() {
		const { navigation, loading, author, error } = this.props

		return <AuthorDetailComponent navigation={navigation} loading={loading} author={author} error={error} />
	}
}

const mapStateToProps = ({ author }) => ({
	loading: author.loadingSearchAuthorByProgram,
	author: author.author,
	error: author.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(DiscoverCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetailContainer)
