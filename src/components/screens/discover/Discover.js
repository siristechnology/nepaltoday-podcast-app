import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
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

const DiscoverContainer = ({ navigation, LOCAL_STACK_ROUTES }) => {
	const { loading, data, refetch, error } = useQuery(GET_ALL_PROGRAMS_QUERY)
	const [authorName, setAuthorName] = useState('')

	useEffect(() => {
		const { params } = navigation.state
		if (!params || !params.LOCAL_STACK_ROUTES) {
			navigation.setParams({
				LOCAL_STACK_ROUTES,
			})
		}
	})

	const onTypeAuthorName = (authorName: string): void => {
		setAuthorName(authorName)
	}

	const onSearchForAuthor = (): void => {
		if (authorName.length) {
			navigation.navigate(LOCAL_STACK_ROUTES.SEARCH_AUTHORS_RESULT, {
				[CONSTANTS.PARAMS.SEARCH_AUTHOR_BY_NAME]: authorName,
			})
		}
	}

	return (
		<HomeComponent
			onTypeAuthorName={onTypeAuthorName}
			onSearchForAuthor={onSearchForAuthor}
			navigation={navigation}
			onRefresh={refetch}
			loading={loading}
			error={error}
			data={data?.getAllPrograms}
		/>
	)
}

const GET_ALL_PROGRAMS_QUERY = gql`
	query getAllPrograms {
		getAllPrograms {
			id
			title
			imageUrl
			category
			weight
			publisher {
				id
				title
				imageUrl
			}
		}
	}
`
export default DiscoverContainer
