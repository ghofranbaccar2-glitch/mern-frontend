const initialState = {
    products: [],
    loading: false,
    error: null,
    product : null,
    errorProduct: null
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return {
                ...state,               
                loading: true,
                error: null,
            };          
        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload,
            };          
        case 'FETCH_PRODUCTS_FAILURE':  
            return {
                ...state,
                loading: false,            
                error: action.payload,
            };
        case 'FETCH_PRODUCT_BY_ID_REQUEST':
            return {
                ...state,          
                product: null,
                errorProduct: null,
            };  
        case 'FETCH_PRODUCT_BY_ID_SUCCESS':
            return {
                ...state,   
                product: action.payload,
                errorProduct: null,
            };  
        case 'FETCH_PRODUCT_BY_ID_FAILURE':
            return {
                ...state,
                product: null,
                errorProduct: action.payload,
            };
        default:
            return state;
    }
};
export default productReducer;
