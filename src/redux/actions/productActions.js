import axios from "axios";
import { toast } from "react-toastify";

export const fetchProducts = ()  => {
    return async (dispatch) => {

        dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
        try {
            const response = await axios.get("/api/products/all", {
        headers: { authorization: localStorage.getItem("token") },
      });
            console.log("Fetched Products:", response.data);
            dispatch({
                type: "FETCH_PRODUCTS_SUCCESS",
                payload: response.data.products,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_PRODUCTS_FAILURE",
                payload: error.message,
            });
        }   

    } ;
}

export const AddProduct = (productData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/api/products/create", productData,
                {
        headers: { authorization: localStorage.getItem("token") },
      }
            );
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error adding product:", error);  
               
            };
        }
    };
export const DeleteProduct = (productId) => {
    return async (dispatch) => {
        try {  
            const response = await axios.delete(`/api/products/delete/${productId}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
            toast.success(response.data.message);
            dispatch(fetchProducts());
        } catch (error) {
            console.error("Error deleting product:", error);
        }       
    };
}
export const fetchProductById = (productId)  => {
    return async (dispatch) => {    
        try {
            const response = await axios.get(`/api/products/${productId}`)
            dispatch({
                type: "FETCH_PRODUCT_BY_ID_SUCCESS",
                payload: response.data.product,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_PRODUCT_BY_ID_FAILURE",
                payload: error.message,
            });
        }
    } ;
}   
export const UpdateProduct = (productId, updatedData) => {
    return async (dispatch) => {
        try {       
            const response = await axios.put(`/api/products/update/${productId}`, updatedData, {
        headers: { authorization: localStorage.getItem("token") },
      });
            toast.success(response.data.message);
            dispatch(fetchProducts());
        } catch (error) {
            console.error("Error updating product:", error);
        }   
    };
}