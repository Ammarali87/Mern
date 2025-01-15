
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addItem, removeItem } from '../store/slices/cartSlice';
import { Button, Container, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CartItem } from '../types/Cart';

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart) as { cartItems: { _id: string; image: string; name: string; price: number; quantity: number; slug: string; countInStock: number; }[] };
  const dispatch = useDispatch();
    
  const removeItemHandler = (id: string) => {
    try {
      dispatch(removeItem(id));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const updateQuantity = (item: CartItem, quantity: number) => {
    if (quantity < 1) {
      toast.warn('Quantity must be at least 1');
      return;
    }
    if (quantity > item.countInStock) {
      toast.warn(`Sorry. Only ${item.countInStock} available`);
      return;
    }
    dispatch(addItem({ ...item, quantity }));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.image} alt={item.name} width="50" />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>
                 
                  <td>
          <Container>
          <td>
              <Container className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  <i className="fas fa-minus"> - </i>
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                  disabled={item.quantity === item.countInStock}
                >
                  <i className="fas fa-plus"> + </i>
                </Button>
              </Container>
            </td>
            <td>
              <Button
                onClick={() => removeItemHandler(item._id)}
                variant="danger"
                size="sm"
                className="d-flex align-items-center gap-2"
              >
                <i className="fas fa-trash"></i>
                <span>Remove</span>
              </Button>
            </td>
          </Container>
              </td>
              <td>${item.price}</td>
              <td>
              </td>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
