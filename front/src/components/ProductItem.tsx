
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Product } from '../types/Product';
import { addItem } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { convertProductToCartItem } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function ProductItem({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);


  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    dispatch(addItem(
      { ...convertProductToCartItem(product)
        , quantity }));
    toast.success('Product added to cart');
    alert('Product added to cart');
  };


  return (
    <Card className="h-100">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ objectFit: 'cover', height: '200px' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title className="text-truncate">{product.title}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <Button onClick={addToCartHandler} variant="primary" className="w-100">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
