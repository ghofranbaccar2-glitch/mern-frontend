import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { useEffect } from 'react'
import Product from "./Product";

const Productlist = () => {
  const products = useSelector((state)=> state.productReducer.products);
  const loading = useSelector((state )=> state.productReducer.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            < div className="product-list" >
              {products.map(product => (
                <Product key={product._id} {...product} />
              ))}
            </div>
          )}
    </div>
  )
}

export default Productlist
