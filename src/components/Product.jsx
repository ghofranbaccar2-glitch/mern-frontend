import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProduct, fetchProductById } from '../redux/actions/productActions';
import { UpdateProduct } from '../redux/actions/productActions';

const Product = ({ name, description, price, inStock, imageUrl, _id }) => {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const dispatch = useDispatch();
  const fetchedProduct = useSelector(state => state.productReducer.product);

  const [product, setProduct] = useState({
    name: fetchedProduct ? fetchedProduct.name : '',
    price: fetchedProduct ? fetchedProduct.price : 0,
    description: fetchedProduct ? fetchedProduct.description : '',
    imageUrl: fetchedProduct ? fetchedProduct.imageUrl : '',
    inStock: fetchedProduct ? fetchedProduct.inStock : true
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({  
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  useEffect(() => {
    if (fetchedProduct && showUpdate) {
      setProduct({  
        name: fetchedProduct.name ||"",
        price: fetchedProduct.price ||0,
        description: fetchedProduct.description ||"",
        imageUrl: fetchedProduct.imageUrl ||"",
        inStock: fetchedProduct.inStock || true,
      });
    }
  }, [fetchedProduct,showUpdate]);

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Card.Text>
            Price: ${price}
          </Card.Text>
          <Card.Text>
            {inStock ? 'in Stock' : 'Out of Stock'}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="success" onClick={()=> { handleShowUpdate();dispatch(fetchProductById(_id)); }}> 
          Update
          </Button>
          <Button variant="danger" className="ms-2" onClick={handleShow}>
            Delete
            </Button>
        </Card.Footer>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => dispatch(DeleteProduct(_id))}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdate} onHide={handleCloseUpdate} backdrop="static" keyboard={false}>
        <Modal.Body> 
          <Form >
      <Form.Group className="mb-3" >
        <Form.Label> Product Name</Form.Label>
        <Form.Control type="text" name="name" value = {product.name} onChange={handleChange} />
      </Form.Group>
      {/*Price*/}
      <Form.Group className="mb-3" >
        <Form.Label> Price</Form.Label>
        <Form.Control type="number" name="price" value = {product.price} onChange={handleChange} />
      </Form.Group>
      {/*Description*/}
      <Form.Group className="mb-3" >
        <Form.Label> Description</Form.Label>  
        <Form.Control as="textarea" rows={3} name="description" value = {product.description} onChange={handleChange} />
      </Form.Group>
      {/*Image URL*/}
      <Form.Group className="mb-3" >
        <Form.Label> Image URL</Form.Label>   
        <Form.Control type="text" name="imageUrl" value = {product.imageUrl} onChange={handleChange} />
      </Form.Group>
      {/*Availability*/}
      <Form.Group className="mb-3" >
        <Form.Check type="checkbox" label="in Stock" name="inStock" checked={product.inStock} onChange={handleChange} /> 
      </Form.Group>
    </Form>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => dispatch(UpdateProduct(_id, product))}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Product
