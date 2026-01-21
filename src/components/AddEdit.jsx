import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddProduct } from '../redux/actions/productActions';
import { toast } from 'react-toastify';

const AddEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    inStock: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
 const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name && product.description && product.price>0 && product.imageUrl) {
      dispatch(AddProduct(product));
      navigate('/Products');
    } else {
      toast.error('Please fill in all fields correctly');
    }
  };

  return (
    <Form className="m-4 w-50 mx-auto" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label> Product Name</Form.Label>
        <Form.Control type="text" name="name" value={product.name} onChange={handleChange} />
      </Form.Group>
      {/*Price*/}
      <Form.Group className="mb-3" >
        <Form.Label> Price</Form.Label>
        <Form.Control type="number" name="price" value={product.price} onChange={handleChange} />
      </Form.Group>
      {/*Description*/}
      <Form.Group className="mb-3" >
        <Form.Label> Description</Form.Label>  
        <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleChange} />
      </Form.Group>
      {/*Image URL*/}
      <Form.Group className="mb-3" >
        <Form.Label> Image URL</Form.Label>   
        <Form.Control type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
      </Form.Group>
      {/*Availability*/}
      <Form.Group className="mb-3" >
        <Form.Check type="checkbox" label="in Stock" name="inStock" checked={product.inStock} onChange={handleChange} />
      </Form.Group>
      {/*Create Button*/}
      <Button variant="primary" type="submit">Create Product</Button>
    </Form>
  )
}

export default AddEdit
