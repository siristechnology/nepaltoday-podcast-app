export const Types = {
  SEARCH_AUTHOR_BY_NAME_REQUEST: 'author/SEARCH_AUTHOR_BY_NAME_REQUEST',
  SEARCH_AUTHOR_BY_NAME_SUCCESS: 'author/SEARCH_AUTHOR_BY_NAME_SUCCESS',
  SEARCH_AUTHOR_BY_NAME_ERROR: 'author/SEARCH_AUTHOR_BY_NAME_ERROR',
  GET_AUTHOR_BY_PROGRAM_REQUEST: 'author/GET_AUTHOR_BY_PROGRAM_REQUEST',
  GET_AUTHOR_BY_PROGRAM_SUCCESS: 'author/GET_AUTHOR_BY_PROGRAM_SUCCESS',
  GET_AUTHOR_BY_PROGRAM_ERROR: 'author/GET_AUTHOR_BY_PROGRAM_ERROR',
};

const INITIAL_STATE = {
  loadingSearchAuthorByName: true,
  loadingSearchAuthorByProgram: false,
  author: null,
  error: false,
  authors: [],
};

export const Creators = {
  searchAuthorByName: name => ({
    type: Types.SEARCH_AUTHOR_BY_NAME_REQUEST,
    payload: { name },
  }),

  searchAuthorByNameSuccess: data => ({
    type: Types.SEARCH_AUTHOR_BY_NAME_SUCCESS,
    payload: { data },
  }),

  searchAuthorByNameFailure: () => ({
    type: Types.SEARCH_AUTHOR_BY_NAME_ERROR,
  }),

  getAuthorByProgram: program => ({
    type: Types.GET_AUTHOR_BY_PROGRAM_REQUEST,
    payload: { program },
  }),

  getAuthorByProgramSuccess: data => ({
    type: Types.GET_AUTHOR_BY_PROGRAM_SUCCESS,
    payload: { data },
  }),

  getAuthorByProgramFailure: () => ({
    type: Types.GET_AUTHOR_BY_PROGRAM_ERROR,
  }),
};

const author = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.SEARCH_AUTHOR_BY_NAME_REQUEST:
      return {
        ...state,
        authors: [],
        loadingSearchAuthorByName: true,
        error: false,
      };

    case Types.SEARCH_AUTHOR_BY_NAME_SUCCESS:
      return {
        ...state,
        loadingSearchAuthorByName: false,
        authors: payload.data,
      };

    case Types.SEARCH_AUTHOR_BY_NAME_ERROR:
      return {
        ...state,
        loadingSearchAuthorByName: false,
        error: true,
      };

    case Types.GET_AUTHOR_BY_PROGRAM_REQUEST:
      return {
        ...state,
        author: null,
        loadingSearchAuthorByProgram: true,
        error: false,
      };

    case Types.GET_AUTHOR_BY_PROGRAM_SUCCESS:
      return {
        ...state,
        loadingSearchAuthorByProgram: false,
        author: payload.data,
      };

    case Types.GET_AUTHOR_BY_PROGRAM_ERROR:
      return {
        ...state,
        loadingSearchAuthorByProgram: false,
        error: true,
      };

    default:
      return state;
  }
};

export default author;
