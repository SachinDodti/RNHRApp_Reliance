import { WISH_ACTION } from "../Actions/Constants";

const WishReducer = (
  state = {
    showTemplate: false,
    birthday: [],
    anniversary: [],
    searchResult: [],
    wished: false,
    templateText: "",
  },
  action,
) => {
  switch (action.type) {
  case WISH_ACTION.RESET_WISH_SEARCH:
    return {
      ...state,
      searchResult: [],
    };
  case WISH_ACTION.CLOSE_WISH_TEMPLATE:
    return {
      ...state,
      error: null,
      wished: false,
      showTemplate: false,
    };
  case WISH_ACTION.WISH_TEMPLATE:
    return {
      ...state,
      error: null,
      wished: false,
      showTemplate: true,
      templateText: action.data,
      wishType: action.wishType,
      employee: action.employee,
    };
  case WISH_ACTION.GET_TODAY_BIRTHDAY_SUCCESS:
    return {
      ...state,
      birthday: action.data ? action.data : [],
      error: null,
      wished: false,
    };
  case WISH_ACTION.GET_TODAY_BIRTHDAY_ERROR:
    return {
      ...state,
      error: action.error,
      birthday: [],
      wished: false,
    };
  case WISH_ACTION.GET_TODAY_ANNIVERSARY_SUCCESS:
    return {
      ...state,
      anniversary: action.data ? action.data : [],
      error: null,
      wished: false,
    };
  case WISH_ACTION.GET_TODAY_ANNIVERSARY_ERROR:
    return {
      ...state,
      error: action.error,
      anniversary: [],
      wished: false,
    };

  case WISH_ACTION.SEARCH_SUCCESS:
    return {
      ...state,
      searchResult: action.data ? action.data : [],
      error: null,
      wished: false,
    };
  case WISH_ACTION.SEARCH_ERROR:
    return {
      ...state,
      error: action.error,
      searchResult: [],
      wished: false,
    };

  case WISH_ACTION.BIRTHDAY_WISH_SUCCESS:
    return {
      ...state,
      error: null,
      wished: true,
    };
  case WISH_ACTION.BIRTHDAY_WISH_ERROR:
    return { ...state, error: action.error, wished: false };

  case WISH_ACTION.ANNIVERSARY_WISH_SUCCESS:
    return {
      ...state,
      error: null,
      wished: true,
    };
  case WISH_ACTION.ANNIVERSARY_WISH_ERROR:
    return { ...state, error: action.error, wished: false };

  case WISH_ACTION.RESET_WISH_ACTION:
    return { ...state, wished: false };

  default:
    return { ...state };
  }
};

export default WishReducer;
