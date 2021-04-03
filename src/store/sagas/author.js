import { call, select, put, delay } from 'redux-saga/effects'

import { Creators as AuthorCreators } from '../ducks/author'
import api from '~/services/api'

export function* searchProgramByName({ payload }) {
	try {
		const { name } = payload

		const { data } = yield call(api.get, `/authors/programs/search/${name}`)

		yield put(AuthorCreators.searchProgramByNameSuccess(data.programs))
	} catch (err) {
		yield put(AuthorCreators.searchProgramByNameFailure())
	}
}

export function* getAuthorByProgram({ payload }) {
	try {
		const { program } = payload

		const { data } = yield call(api.get, `/authors/${program}`)

		yield put(AuthorCreators.getAuthorByProgramSuccess(data.author))
	} catch (err) {
		yield put(AuthorCreators.getAuthorByProgramFailure())
	}
}
