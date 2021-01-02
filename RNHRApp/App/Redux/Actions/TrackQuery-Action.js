import { TRACK_QUERY_ACTION } from "./Constants";

export function getTrackQuerySuccess(data) {
    return {
        type: TRACK_QUERY_ACTION.GET_TRACK_QUERY_SUCCESS,
        data
    };
}
export function getTrackQueryFailure(error) {
    return {
        type: TRACK_QUERY_ACTION.GET_TRACK_QUERY_FAILURE,
        error
    };
}

export function viewQueryStatusSuccess(data) {
    return {
        type: TRACK_QUERY_ACTION.VIEW_STATUS_QUERY_SUCCESS,
        data
    };

}

export function viewQueryStatusFailure(error) {
    return {
        type: TRACK_QUERY_ACTION.VIEW_STATUS_QUERY_FAILURE,
        error
    };
}

export function getQueryStatusSuccess(data) {
    return {
        type: TRACK_QUERY_ACTION.GET_QUERY_STATUS_SUCCESS,
        data
    };

}

export function getQueryStatusFailure(error) {
    return {
        type: TRACK_QUERY_ACTION.GET_QUERY_STATUS_FAILURE,
        error
    };
}

