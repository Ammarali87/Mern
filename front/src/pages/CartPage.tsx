import { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'

export default function CartPage() {
  const navigate = useNavigate()

  const {
    state: {
      mode,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store)

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }
  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant={mode}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant={mode}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}







// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store/store';
// import { addItem, removeItem } from '../store/slices/cartSlice';
// import { Button, Container, Table } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { CartItem } from '../types/Cart';

// export default function CartPage() {
//   const cart = useSelector((state: RootState) => state.cart) as { cartItems: { _id: string; image: string; name: string; price: number; quantity: number; slug: string; countInStock: number; }[] };
//   const dispatch = useDispatch();
    
//   const removeItemHandler = (id: string) => {
//     try {
//       dispatch(removeItem(id));
//       toast.success('Item removed from cart');
//     } catch (error) {
//       toast.error('Failed to remove item');
//     }
//   };

//   const updateQuantity = (item: CartItem, quantity: number) => {
//     if (quantity < 1) {
//       toast.warn('Quantity must be at least 1');
//       return;
//     }
//     if (quantity > item.countInStock) {
//       toast.warn(`Sorry. Only ${item.countInStock} available`);
//       return;
//     }
//     dispatch(addItem({ ...item, quantity }));
//   };

//   return (
//     <div>
//       <h1>Shopping Cart</h1>
//       {cart.cartItems.length === 0 ? (
//         <p>Cart is empty</p>
//       ) : (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.cartItems.map((item) => (
//               <tr key={item._id}>
//                 <td>
//                   <img src={item.image} alt={item.name} width="50" />
//                 </td>
//                 <td>{item.name}</td>
//                 <td>${item.price}</td>
//                 <td>{item.quantity}</td>
//                 <td>
                 
//                   <td>
//           <Container>
//           <td>
//               <Container className="d-flex align-items-center gap-2">
//                 <Button
//                   variant="outline-secondary"
//                   size="sm"
//                   onClick={() => updateQuantity(item, item.quantity - 1)}
//                   disabled={item.quantity === 1}
//                 >
//                   <i className="fas fa-minus"> - </i>
//                 </Button>
//                 <span className="mx-2">{item.quantity}</span>
//                 <Button
//                   variant="outline-secondary"
//                   size="sm"
//                   onClick={() => updateQuantity(item, item.quantity + 1)}
//                   disabled={item.quantity === item.countInStock}
//                 >
//                   <i className="fas fa-plus"> + </i>
//                 </Button>
//               </Container>
//             </td>
//             <td>
//               <Button
//                 onClick={() => removeItemHandler(item._id)}
//                 variant="danger"
//                 size="sm"
//                 className="d-flex align-items-center gap-2"
//               >
//                 <i className="fas fa-trash"></i>
//                 <span>Remove</span>
//               </Button>
//             </td>
//           </Container>
//               </td>
//               <td>${item.price}</td>
//               <td>
//               </td>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// }
