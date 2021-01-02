import { PRODUCT_CORNER_ACTION } from "./Constants";

export function getProductDetailSuccess(data) {
    return {
        type: PRODUCT_CORNER_ACTION.GET_PRODUCT_CORNER_SUCCESS,
        data
    };
}
export function getProductDetailFailure(error) {
    return {
        type: PRODUCT_CORNER_ACTION.GET_PRODUCT_CORNER_FAILURE,
        error
    };
}