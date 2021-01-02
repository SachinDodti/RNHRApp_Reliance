import { WISH_ACTION } from "./Constants";

export function closeWishTemplateAction() {
  return {
    type: WISH_ACTION.CLOSE_WISH_TEMPLATE,
  };
}

export function getTodayBirthdaySuccess(data) {
  return {
    type: WISH_ACTION.GET_TODAY_BIRTHDAY_SUCCESS,
    data,
  };
}

export function showWishSuccess(data, wishType, employee) {
  return {
    wishType,
    type: WISH_ACTION.WISH_TEMPLATE,
    data,
    employee,
  };
}

export function getTodayBirthdayError(error) {
  return {
    type: WISH_ACTION.GET_TODAY_BIRTHDAY_ERROR,
    error,
  };
}

export function getTodayAnniversarySuccess(data) {
  return {
    type: WISH_ACTION.GET_TODAY_ANNIVERSARY_SUCCESS,
    data,
  };
}

export function getTodayAnniversaryError(error) {
  return {
    type: WISH_ACTION.GET_TODAY_ANNIVERSARY_ERROR,
    error,
  };
}
export function searchBirthdayAnniversarySuccess(data) {
  return {
    type: WISH_ACTION.SEARCH_SUCCESS,
    data,
  };
}

export function searchBirthdayAnniversaryError(error) {
  return {
    type: WISH_ACTION.SEARCH_ERROR,
    error,
  };
}

export function birthdayWishSuccess(data) {
  return {
    type: WISH_ACTION.BIRTHDAY_WISH_SUCCESS,
    data,
  };
}

export function resetWishFlag() {
  return {
    type: WISH_ACTION.RESET_WISH_ACTION,
  };
}

export function resetWishSearchResult() {
  return {
    type: WISH_ACTION.RESET_WISH_SEARCH,
  };
}

export function birthdayWishError(error) {
  return {
    type: WISH_ACTION.BIRTHDAY_WISH_ERROR,
    error,
  };
}

export function anniversaryWishSuccess(data) {
  return {
    type: WISH_ACTION.ANNIVERSARY_WISH_SUCCESS,
    data,
  };
}

export function anniversaryWishError(error) {
  return {
    type: WISH_ACTION.ANNIVERSARY_WISH_ERROR,
    error,
  };
}
