import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addItem } from '../store/slices/cartSlice';
import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';
import { convertProductToCartItem } from '../utils';
import Rating from './Rating';

function ProductItem({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch(addItem({ ...item, quantity }));
    toast.success('Product added to the cart');
  };

  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <Card className="product-card shadow-sm rounded">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} className="card-img-top" alt={product.name} />
        </Link>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Link to={`/product/${product.id}`}>
            <Card.Title className="product-title text-truncate">{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text className="product-price text-success">${product.price}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" className="w-100" disabled>
              Out of stock
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => addToCartHandler(convertProductToCartItem(product))}
            >
              Add to cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductItem;







// import { useContext } from 'react'
// import { Button, Card } from 'react-bootstrap'
// import { Link, Links } from 'react-router-dom'
// import { toast } from 'react-toastify'
// // import { Store } from '../Store'
// import { CartItem } from '../types/Cart'
// import { Product } from '../types/Product'
// import { convertProductToCartItem } from '../utils'
// import Rating from './Rating'

// function ProductItem({ product }: { product: Product }) {
//   const { state, dispatch } = useContext(Store)
//   const {
//     cart: { cartItems },
//   } = state

//   const addToCartHandler = (item: CartItem) => {
//     const existItem = cartItems.find((x) => x._id === product._id)
//     const quantity = existItem ? existItem.quantity + 1 : 1
//     if (product.countInStock < quantity) {
//       alert('Sorry. Product is out of stock')
//       return
//     }
//     dispatch({
//       type: 'CART_ADD_ITEM',
//       payload: { ...item, quantity },
//     })
//     toast.success('Product added to the cart')
//   }

//   return (
//     <Card>
//       <Link to={`/product/${product.id}`}>
//         <img src={product.image} className="card-img-top" alt={product.name} />
//       </Link>
//       <Card.Body>
//         <Link to={`/product/${product.id}`}>
//           <Card.Title>{product.name}</Card.Title>
//         </Link>
//         <Rating rating={product.rating} numReviews={product.numReviews} />
//         <Card.Text>${product.price}</Card.Text>
//         {product.countInStock === 0 ? (
//           <Button variant="light" disabled>
//             Out of stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => addToCartHandler(convertProductToCartItem(product))}
//           >
//             Add to cart
//           </Button>
//         )}
//       </Card.Body>
//     </Card>
//   )
// }

// export default ProductItem
