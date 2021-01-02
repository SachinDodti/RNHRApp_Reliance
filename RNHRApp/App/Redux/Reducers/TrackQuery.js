import { TRACK_QUERY_ACTION } from "../Actions/Constants";

const TrackQueryReducer = (
    state = {
        trackQueryList: [],
        queryStatus: [],
        viewQueryStatus: {}
    },
    action
) => {
    switch (action.type) {
        case TRACK_QUERY_ACTION.GET_TRACK_QUERY_SUCCESS:
            console.log("TrackQueryReducer track query success action.data: ", action.data);
            return {
                ...state,
                trackQueryList: action.data
            };

        case TRACK_QUERY_ACTION.GET_TRACK_QUERY_FAILURE:
            return {
                ...state,
                error: action.error.errorMessage,
                trackQueryList: []
            };

        case TRACK_QUERY_ACTION.VIEW_STATUS_QUERY_SUCCESS:
            console.log("TrackQueryReducer view status action.data: ", action.data);
            return {
                ...state,
                viewQueryStatus: action.data ? action.data : {},
                error: null
            };
        case TRACK_QUERY_ACTION.VIEW_STATUS_QUERY_FAILURE:
            return {
                ...state,
                error: action.error,
                viewQueryStatus: {}
            };
        case TRACK_QUERY_ACTION.GET_QUERY_STATUS_SUCCESS:
            console.log("TrackQueryReducer get query status action.data: ", action.data);
            return {
                ...state,
                queryStatus: action.data ? action.data : [],
                error: null
            };
        case TRACK_QUERY_ACTION.GET_QUERY_STATUS_FAILURE:
            return {
                ...state,
                error: action.error,
                queryGroup: []
            };
        default:
            return { ...state };
    }
};

export default TrackQueryReducer;