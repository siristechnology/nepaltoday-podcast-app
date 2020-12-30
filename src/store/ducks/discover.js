export const Types = {
    GET_DISCOVER_REQUEST: 'subject/GET_DISCOVER_REQUEST',
    GET_DISCOVER_SUCCESS: 'subject/GET_DISCOVER_SUCCESS',
    GET_DISOVER_ERROR: 'subject/GET_DISCOVER_ERROR',
  };
  
  const INITIAL_STATE = {
    loading: true,
    error: false,
    data: null,
  };
  
  export const Creators = {
    getDiscover: () => ({
      type: Types.GET_DISCOVER_REQUEST,
    }),
  
    getDiscoverSuccess: data => ({
      type: Types.GET_DISCOVER_SUCCESS,
      payload: { data },
    }),
  
    getDiscoverFailure: () => ({
      type: Types.GET_DISCOVER_ERROR,
    }),
  };
  
  const subject = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
      case Types.GET_DISCOVER_REQUEST:
        return {
          ...INITIAL_STATE,
        };
  
      case Types.GET_DISCOVER_SUCCESS:
        return {
          ...state,
          data: payload.data,
          loading: false,
        };
  
      case Types.GET_DISCOVER_ERROR:
        return {    
          ...state,
          loading: false,
          error: true,
        };
  
      default:
        return state;
    }
  };
  
  export default subject;
  