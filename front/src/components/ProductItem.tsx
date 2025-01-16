
// import { addItem } from '../store/slices/cartSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store/store';

import { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'
import { Product } from '../types/Product'
import { convertProductToCartItem } from '../utils'
import Rating from './Rating'

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
    alert("add to cart ")
    toast.success('Product added to the cart')
  }

  return (
    <Card>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem


// export default function ProductItem({ product }: { product: Product }) {
//   const dispatch = useDispatch();
//   const cart = useSelector((state: RootState) => state.cart);


//   const addToCartHandler = () => {
//     const existItem = cart.cartItems.find((x) => x._id === product._id)
//     const quantity = existItem ? existItem.quantity + 1 : 1
//     if (product.countInStock < quantity) {
//       alert('Sorry. Product is out of stock')
//       return
//     }
//     dispatch(addItem(
//       { ...convertProductToCartItem(product)
//         , quantity }));
//     toast.success('Product added to cart');
//     alert('Product added to cart');
//   };


//   return (
//     <Card className="h-100">
//       <Link to={`/products/${product.id}`}>
//         <img
//           src={product.image}
//           className="card-img-top"
//           alt={product.name}
//           style={{ objectFit: 'cover', height: '200px' }}
//         />
//       </Link>
//       <Card.Body>
//         <Link to={`/products/${product.id}`}>
//           <Card.Title className="text-truncate">{product.title}</Card.Title>
//         </Link>
//         <Rating rating={product.rating} numReviews={product.numReviews} />
//         <Card.Text>
//           <strong>${product.price}</strong>
//         </Card.Text>
//         <Button onClick={addToCartHandler} variant="primary" className="w-100">
//           Add to Cart
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }
