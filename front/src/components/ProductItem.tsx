import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';
import { convertProductToCartItem } from '../utils';
import Rating from './Rating';

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.warn('Sorry, product is out of stock.');
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });

    toast.success('Product added to the cart!');
  };

  return (
    <Card className="product-item h-100 shadow-sm">
      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top img-fluid"
          style={{ objectFit: 'cover', height: '200px' }}
        />
      </Link>

      {/* Product Details */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Link to={`/products/${product.id}`} className="text-decoration-none">
            <Card.Title className="text-truncate">{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text className="mt-2">
            <strong>${product.price.toFixed(2)}</strong>
          </Card.Text>
        </div>

        {/* Add to Cart Button */}
        {product.countInStock === 0 ? (
          <Button variant="light" disabled className="w-100 mt-2">
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
            variant="primary"
            className="w-100 mt-2"
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
