import { PRODUCT_CORNER_ACTION } from "../Actions/Constants";

const ProductCornerReducer = (
    state = {
        productCornerList: [],
    },
    action
) => {
    switch (action.type) {
        case PRODUCT_CORNER_ACTION.GET_PRODUCT_CORNER_SUCCESS:
            console.log("ProductCornerReducer track query success action.data: ", action.data);
            return {
                ...state,
                productCornerList: action.data
            };

        case PRODUCT_CORNER_ACTION.GET_PRODUCT_CORNER_FAILURE:
            return {
                ...state,
                error: action.error.errorMessage,
                productCornerList: []
            };
        default:
            return { ...state };
    }
};

export default ProductCornerReducer;